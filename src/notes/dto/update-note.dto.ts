import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateNoteDto } from "./create-note.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: "Whether the note is archived or not" })
    isArchived?: boolean;
}
