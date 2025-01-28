import { IsArray, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NoteDto {
    @ApiProperty({ description: "Id of the note" })
    id!: string;

    @ApiProperty({ description: "Title of the note" })
    title!: string;

    /* @ApiProperty({
        description: "Array of tags to associated with the note",
        type: [TagDto],
    })
    tags!: TagDto[];
 */
    @ApiProperty({ description: "Content of the note" })
    content!: string;

    @ApiProperty({ description: "Whether the note is archived or not" })
    isArchived!: boolean;

    @ApiProperty({ description: "Date when the note was last updated" })
    updatedAt!: Date;
}
