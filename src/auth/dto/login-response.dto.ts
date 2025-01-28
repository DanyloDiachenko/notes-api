import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({ description: "User id" })
    id!: string;

    @ApiProperty({ description: "User email" })
    email!: string;

    @ApiProperty({ description: "Bearer token" })
    token!: string;
}
