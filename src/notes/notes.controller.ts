import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { NoteDto } from "./dto/note.dto";

@ApiTags("favorites")
@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @ApiOperation({ summary: "Get all user`s notes" })
    @ApiQuery({
        name: "tag",
        description: "Filter by specific tag",
        required: false,
    })
    @ApiQuery({ name: "search", description: "Search notes", required: false })
    @ApiQuery({
        name: "isArchived",
        description: "Filter notes is they arhived",
        default: false,
        required: false,
    })
    @ApiResponse({ status: 200, description: "Success", type: [NoteDto] })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async getAll(
        @Req() req: any,
        @Query() tag?: string,
        @Query() search?: string,
        @Query() isArchived?: boolean,
    ) {
        return await this.notesService.getAll(
            req.user.id,
            tag,
            search,
            isArchived,
        );
    }

    @ApiOperation({ summary: "Get one note by id" })
    @ApiParam({ name: "id", description: "Note id" })
    @ApiResponse({ status: 200, description: "Success", type: NoteDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(":id")
    async getOne(@Param() noteId: string) {
        return await this.notesService.getOne(noteId);
    }

    @ApiOperation({ summary: "Create note" })
    @ApiBody({ type: CreateNoteDto })
    @ApiResponse({ status: 201, description: "Success", type: NoteDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createNoteDto: CreateNoteDto) {
        return await this.notesService.create(createNoteDto);
    }

    @ApiOperation({ summary: "Update note" })
    @ApiParam({ name: "id", description: "Note id" })
    @ApiBody({ type: UpdateNoteDto })
    @ApiResponse({ status: 200, description: "Success", type: NoteDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(":id")
    async update(
        @Body() updateNoteDto: UpdateNoteDto,
        @Param() noteId: string,
    ) {
        return await this.notesService.update(updateNoteDto, noteId);
    }

    @ApiOperation({ summary: "Delete note" })
    @ApiParam({ name: "id", description: "Note id" })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async delete(@Param() noteId: string) {
        return await this.notesService.delete(noteId);
    }
}
