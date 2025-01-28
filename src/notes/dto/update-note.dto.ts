import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateNoteDto } from "./create-note.dto";
import { IsBoolean } from "class-validator";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @IsBoolean()
    @ApiProperty({ description: "Whether the note is archived or not" })
    isArchived?: boolean;
}
