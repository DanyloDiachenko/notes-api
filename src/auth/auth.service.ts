import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "src/users/dto/authUser.dto";
import { UsersService } from "src/users/users.service";

export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: AuthDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new UnauthorizedException("Email is already taken");
        }

        const user = await this.usersService.createUser(
            dto.email,
            dto.password,
        );

        const accessToken = await this.login(dto);

        return { email: user.email, accessToken: accessToken };
    }

    async login(dto: AuthDto) {
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

        return { accessToken: token, email: user.email };
    }

    async getProfile(token: string) {
        const user = await this.usersService.findByEmail(req.user.email);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return { id: user.id, email: user.email };
    }
}
