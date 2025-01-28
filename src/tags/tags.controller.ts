import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { CreateTagDto } from "./dto/create-tag.dto";

@Controller("tags")
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async getAll() {
        return await this.tagsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(":id")
    async getOne(@Param() tagId: string) {
        return await this.tagsService.getOne(tagId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(":id")
    async update(@Body() updateTagDto: UpdateTagDto, @Param() tagId: string) {
        return await this.tagsService.update(updateTagDto, tagId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async delete(@Param() tagId: string) {
        return await this.tagsService.delete(tagId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createTagDto: CreateTagDto) {
        return await this.tagsService.create(createTagDto);
    }
}
