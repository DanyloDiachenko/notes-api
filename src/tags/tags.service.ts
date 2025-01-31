import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "./entities/tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { NoteEntity } from "src/notes/entities/note.entity";
import { UserEntity } from "src/users/entites/user.entity";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagsRepository: Repository<TagEntity>,
        @InjectRepository(NoteEntity)
        private readonly notesRepository: Repository<NoteEntity>,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
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

    async create(createTagDto: CreateTagDto, userId: string) {
        const existingTag = await this.tagsRepository.findOne({
            where: { title: createTagDto.title, user: { id: userId } },
        });

        if (existingTag) {
            throw new BadRequestException("Tag with this title already exists");
        }

        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const tag = this.tagsRepository.create({
            title: createTagDto.title,
            slug: createTagDto.slug,
            user,
        });

        await this.tagsRepository.save(tag);

        return {
            id: tag.id,
            title: tag.title,
            slug: tag.slug,
        };
    }
}
