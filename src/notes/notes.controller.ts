import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NotesService } from "./notes.service";

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async getAll(@Req() req: any, @Query() tag?: string) {
        return await this.notesService.getAll(req.user.id, tag);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async getOne(@Param() noteId: string) {
        return await this.notesService.getOne(noteId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put()
    async update(
        @Body() updateNoteDto: UpdateNoteDto,
        @Param() noteId: string,
    ) {
        return await this.notesService.update(updateNoteDto, noteId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete()
    async delete(@Param() noteId: string) {
        return await this.notesService.delete(noteId);
    }
}
