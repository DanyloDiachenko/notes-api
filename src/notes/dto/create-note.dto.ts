import { IsArray, IsString } from "class-validator";

export class CreateNoteDto {
    @IsString()
    title!: string;

    @IsArray()
    tagIds!: string[];

    @IsString()
    content!: string;
}
