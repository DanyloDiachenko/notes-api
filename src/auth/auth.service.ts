import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as argon2 from "argon2";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string) {
        const findedUser = await this.usersService.findOne(email);

        if (!findedUser) {
            throw new BadRequestException("User not found");
        }

        if (findedUser.passwordHash == null) {
            return findedUser;
        }

        const isPasswordsMatched = await argon2.verify(
            findedUser.passwordHash,
            password,
        );

        if (findedUser && isPasswordsMatched) {
            return findedUser;
        }

        throw new UnauthorizedException("User or password are incorrect");
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const findedUser = await this.usersService.findOne(email);
        if (!findedUser) {
            throw new UnauthorizedException("User not found");
        }

        if (findedUser.passwordHash == null) {
            throw new BadRequestException("Please, sign in with Google");
        }

        const isPasswordsMatched = await argon2.verify(
            findedUser.passwordHash,
            password,
        );
        if (!isPasswordsMatched) {
            throw new UnauthorizedException("Password is incorrect");
        }

        return {
            id: findedUser.id,
            email: findedUser.email,
            token: this.jwtService.sign({ id: findedUser.id, email }),
        };
    }

    async getProfile(userEmail: string) {
        const user = await this.usersService.findOne(userEmail);

        if (!user) {
            throw new BadRequestException("User not found");
        }

        const { passwordHash, ...userWithoutPassword } = user;

        return { ...userWithoutPassword };
    }
}
