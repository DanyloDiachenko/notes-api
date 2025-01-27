import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6, { message: "Password must be more than 6 symbols" })
    password!: string;
}
