import {
    Controller,
    Post,
    Body,
    UnauthorizedException,
    UseGuards,
    Get,
    Req,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthDto } from "src/users/dto/authUser.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
    ) {}

    @Post("register")
    async register(@Body() dto: AuthDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new UnauthorizedException("Email is already taken");
        }

        const user = await this.usersService.createUser(
            dto.email,
            dto.password,
        );
        return { id: user.id, email: user.email };
    }

    @Post("login")
    async login(@Body() dto: AuthDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordValid = await this.usersService.validatePassword(
            dto.password,
            user.passwordHash,
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const token = this.jwtService.sign({ id: user.id, email: user.email });
        return { accessToken: token };
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@Req() req) {
        return this.authService.getProfile(req.user.id);
    }
}
