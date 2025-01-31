import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "./entities/tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { NoteEntity } from "src/notes/entities/note.entity";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagsRepository: Repository<TagEntity>,
        @InjectRepository(NoteEntity)
        private readonly notesRepository: Repository<NoteEntity>,
    ) {}

    async getAll() {
        return await this.tagsRepository.find();
    }

    async getOne(tagId: string) {
        const findedTag = await this.tagsRepository.findOne({
            where: {
                id: tagId,
            },
        });

        if (!findedTag) {
            throw new NotFoundException("Tag not found");
        }

        return findedTag;
    }

    async update(updateTagDto: UpdateTagDto, tagId: string) {
        const tagToUpdate = await this.tagsRepository.findOne({
            where: {
                id: tagId,
            },
        });

        if (!tagToUpdate) {
            throw new NotFoundException("Tag not found");
        }

        return await this.tagsRepository.save({
            ...tagToUpdate,
            ...updateTagDto,
        });
    }

    async delete(tagId: string) {
        const tagToDelete = await this.tagsRepository.findOne({
            where: { id: tagId },
            relations: ["note"],
        });

        if (!tagToDelete) {
            throw new NotFoundException("Tag not found");
        }

        if (tagToDelete.note) {
            tagToDelete.note.tags = tagToDelete.note.tags.filter(
                (tag) => tag.id !== tagId,
            );
            await this.notesRepository.save(tagToDelete.note);
        }

        return await this.tagsRepository.remove(tagToDelete);
    }

    async create(createTagDto: CreateTagDto) {
        const tag = this.tagsRepository.find({
            where: { title: createTagDto.title },
        });

        if (tag) {
            throw new BadRequestException("Tag with this title already exists");
        }

        await this.tagsRepository.save(createTagDto);

        return createTagDto;
    }
}
