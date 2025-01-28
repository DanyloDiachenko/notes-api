import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    /* @Post("register")
    async register(@Body() loginDto: LoginDto) {
        return await this.authService.register(loginDto);
    } */

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getProfile(@Request() req: any) {
        return this.authService.getProfile(req.user.email);
    }
}
