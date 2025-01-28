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
import { ApiBearerAuth } from "@nestjs/swagger";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

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

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(":id")
    async getOne(@Param() noteId: string) {
        return await this.notesService.getOne(noteId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createNoteDto: CreateNoteDto) {
        return await this.notesService.create(createNoteDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(":id")
    async update(
        @Body() updateNoteDto: UpdateNoteDto,
        @Param() noteId: string,
    ) {
        return await this.notesService.update(updateNoteDto, noteId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async delete(@Param() noteId: string) {
        return await this.notesService.delete(noteId);
    }
}
