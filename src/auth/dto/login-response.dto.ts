import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    id!: string;
    email!: string;
    token!: string;
}
