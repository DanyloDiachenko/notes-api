import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    @IsString()
    @ApiProperty({ description: "Title of the note to create" })
    title: string;

    @IsArray()
    @ApiProperty({ description: "Array of tag ids to associate with the note" })
    tagIds: string[];

    @IsString()
    @ApiProperty({ description: "Content of the note to create" })
    content: string;
}
