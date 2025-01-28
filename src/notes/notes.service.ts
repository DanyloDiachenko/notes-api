import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "./entities/note.entity";
import { Repository } from "typeorm";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { CreateNoteDto } from "./dto/create-note.dto";

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(NoteEntity)
        private readonly noteRepository: Repository<NoteEntity>,
    ) {}

    async getAll(
        userId: string,
        tag?: string,
        search?: string,
        isArchived?: boolean,
    ) {
        return await this.noteRepository.find({
            where: {
                user: { id: userId },
                ...(tag && { tags: { title: tag } }),
                ...(search && { title: search }),
                isArchived,
            },
            relations: ["tags"],
        });
    }

    async getOne(noteId: string) {
        const findedNote = await this.noteRepository.findOne({
            where: { id: noteId },
            relations: ["tags"],
        });

        if (!findedNote) {
            throw new NotFoundException("Note not found");
        }

        return findedNote;
    }

    async update(updateNoteDto: UpdateNoteDto, noteId: string) {
        const previousNote = await this.noteRepository.findOne({
            where: { id: noteId },
        });

        if (!previousNote) {
            throw new NotFoundException("Note not found");
        }

        return await this.noteRepository.save({
            ...previousNote,
            ...updateNoteDto,
        });
    }

    async delete(noteId: string) {
        const note = await this.noteRepository.findOne({
            where: { id: noteId },
        });

        if (!note) {
            throw new NotFoundException("Note not found");
        }

        return await this.noteRepository.delete(noteId);
    }

    async create(createNoteDto: CreateNoteDto) {
        return await this.noteRepository.save({
            ...createNoteDto,
            isArchived: false,
        });
    }
}
