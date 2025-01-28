import { Module } from "@nestjs/common";
import { NoteEntity } from "src/notes/entities/note.entity";
import { TagEntity } from "./entities/tag.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotesController } from "src/notes/notes.controller";
import { NotesService } from "src/notes/notes.service";

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, TagEntity])],
    controllers: [NotesController],
    providers: [NotesService],
})
export class TagsModule {}
