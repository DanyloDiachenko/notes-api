import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "./entities/note.entity";
import { In, Repository } from "typeorm";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { CreateNoteDto } from "./dto/create-note.dto";
import { TagEntity } from "src/tags/entities/tag.entity";

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(NoteEntity)
        private readonly noteRepository: Repository<NoteEntity>,
        @InjectRepository(TagEntity)
        private readonly tagsRepository: Repository<TagEntity>,
    ) {}

    async getAll(
        userId: string,
        tag?: string,
        search?: string,
        isArchived?: boolean,
    ) {
        const query = this.noteRepository
            .createQueryBuilder("note")
            .leftJoinAndSelect("note.tags", "tags")
            .where("note.userId = :userId", { userId });

        if (tag) {
            query.andWhere((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select("n.id")
                    .from(NoteEntity, "n") // Используем сущность, а не строку
                    .leftJoin("n.tags", "t")
                    .where("t.slug = :tag", { tag })
                    .getQuery();

                return `note.id IN ${subQuery}`;
            });
        }

        if (search) {
            query.andWhere("note.title LIKE :search", {
                search: `%${search}%`,
            });
        }

        if (isArchived !== undefined) {
            query.andWhere("note.isArchived = :isArchived", { isArchived });
        }

        return await query.getMany();
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
            relations: ["tags"],
        });

        if (!previousNote) {
            throw new NotFoundException("Note not found");
        }

        let tags = previousNote.tags;

        if (updateNoteDto.tagIds && updateNoteDto.tagIds.length > 0) {
            tags = await this.tagsRepository.findBy({
                id: In(updateNoteDto.tagIds),
            });
        }

        await this.noteRepository.save({
            ...previousNote,
            ...updateNoteDto,
            tags,
        });

        return await this.noteRepository.findOne({
            where: { id: noteId },
            relations: ["tags"],
        });
    }

    async delete(noteId: string) {
        const note = await this.noteRepository.findOne({
            where: { id: noteId },
            relations: ["tags"],
        });

        if (!note) {
            throw new NotFoundException("Note not found");
        }

        note.tags = [];
        await this.noteRepository.save(note);

        await this.noteRepository.delete(noteId);

        return { success: true };
    }

    async create(createNoteDto: CreateNoteDto, userId: string) {
        return await this.noteRepository.save({
            ...createNoteDto,
            isArchived: false,
            user: { id: userId },
            tags: createNoteDto.tagIds.map((tagId) => ({ id: tagId })),
        });
    }
}
