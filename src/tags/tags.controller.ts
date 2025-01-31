import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { TagsService } from "./tags.service";
import { TagDto } from "./dto/tag.dto";

@ApiTags("tags")
@Controller("tags")
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @ApiOperation({ summary: "Get all user`s tags" })
    @ApiResponse({ status: 200, description: "Success", type: [TagDto] })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async getAll() {
        return await this.tagsService.getAll();
    }

    @ApiOperation({ summary: "Get one tag by id" })
    @ApiParam({ name: "id", description: "Tag id" })
    @ApiResponse({ status: 200, description: "Success", type: TagDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
    })
    @ApiResponse({
        status: 404,
        description: "Not Found",
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(":id")
    async getOne(@Param("id") tagId: string) {
        return await this.tagsService.getOne(tagId);
    }

    @ApiOperation({ summary: "Update tag by id" })
    @ApiParam({ name: "id", description: "Tag id" })
    @ApiBody({ type: UpdateTagDto })
    @ApiResponse({ status: 200, description: "Success", type: TagDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
    })
    @ApiResponse({
        status: 404,
        description: "Not Found",
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(":id")
    async update(
        @Body() updateTagDto: UpdateTagDto,
        @Param("id") tagId: string,
    ) {
        return await this.tagsService.update(updateTagDto, tagId);
    }

    @ApiOperation({ summary: "Delete tag by id" })
    @ApiParam({ name: "id", description: "Tag id" })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({
        status: 404,
        description: "Not Found",
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async delete(@Param("id") tagId: string) {
        return await this.tagsService.delete(tagId);
    }

    @ApiOperation({ summary: "Create tag" })
    @ApiBody({ type: CreateTagDto })
    @ApiResponse({ status: 201, description: "Success", type: TagDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createTagDto: CreateTagDto, @Req() req: any) {

        return await this.tagsService.create(createTagDto, req.user.id);
    }
}
