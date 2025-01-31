import { Module } from "@nestjs/common";
import { NoteEntity } from "src/notes/entities/note.entity";
import { TagEntity } from "./entities/tag.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { UserEntity } from "src/users/entites/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, TagEntity, UserEntity])],
    controllers: [TagsController],
    providers: [TagsService],
})
export class TagsModule {}
