import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ title: "User id", description: "User`s id" })
    id!: string;

    @ApiProperty({ title: "User name", description: "User`s name" })
    email!: string;
}
