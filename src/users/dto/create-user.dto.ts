import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @ApiProperty({ title: "User email", description: "User`s email" })
    email: string;

    @IsString()
    @MinLength(6, { message: "Password must be more than 6 symbols" })
    @ApiProperty({ title: "User password", description: "User`s password" })
    password: string;
}
