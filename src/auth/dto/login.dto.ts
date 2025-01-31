import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @ApiProperty({ title: "User email", description: "User`s email" })
    email: string;

    @IsString()
    @ApiProperty({ title: "User password", description: "User`s password" })
    password: string;
}
