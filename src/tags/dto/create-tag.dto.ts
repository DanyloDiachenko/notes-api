import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTagDto {
    @IsString()
    @ApiProperty({ description: "Title of the tag to create" })
    title: string;

    @IsString()
    @ApiProperty({ description: "Slug of the tag to create" })
    slug: string;
}
