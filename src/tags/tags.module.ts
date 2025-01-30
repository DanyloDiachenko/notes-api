import { Module } from "@nestjs/common";
import { NoteEntity } from "src/notes/entities/note.entity";
import { TagEntity } from "./entities/tag.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, TagEntity])],
    controllers: [TagsController],
    providers: [TagsService],
})
export class TagsModule {}
