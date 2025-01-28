import { ApiProperty } from "@nestjs/swagger";

export class TagDto {
    @ApiProperty({ description: "Id of the tag" })
    id!: string;

    @ApiProperty({ description: "Title of the tag" })
    title!: string;

    @ApiProperty({ description: "Slug of the tag" })
    slug!: string;
}
