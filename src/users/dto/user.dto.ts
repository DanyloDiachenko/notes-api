import { ApiProperty } from "@nestjs/swagger";
import { NoteDto } from "src/notes/dto/note.dto";
import { TagDto } from "src/tags/dto/tag.dto";

export class UserDto {
    @ApiProperty({ title: "User id", description: "User`s id" })
    id: string;

    @ApiProperty({ title: "User name", description: "User`s name" })
    email: string;

    @ApiProperty({
        title: "User`s notes",
        description: "User`s notes",
        example: [NoteDto],
    })
    notes: NoteDto[];

    @ApiProperty({
        title: "User`s tags",
        description: "User`s tags",
        example: [TagDto],
    })
    tags: TagDto[];
}
