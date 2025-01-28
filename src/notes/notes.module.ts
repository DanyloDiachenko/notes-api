import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteEntity } from "./entities/note.entity";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([NoteEntity, TagEntity]),
    ],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule {}
