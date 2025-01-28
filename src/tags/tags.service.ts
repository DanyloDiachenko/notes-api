import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "./entities/tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagsRepository: Repository<TagEntity>,
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
            where: {
                id: tagId,
            },
        });

        if (!tagToDelete) {
            throw new NotFoundException("Tag not found");
        }

        return await this.tagsRepository.remove(tagToDelete);
    }

    async create(createTagDto: CreateTagDto) {
        return await this.tagsRepository.save(createTagDto);
    }
}
