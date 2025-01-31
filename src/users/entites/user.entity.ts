import { NoteEntity } from "src/notes/entities/note.entity";
import { TagEntity } from "src/tags/entities/tag.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @OneToMany(() => NoteEntity, (note) => note.user)
    notes: NoteEntity[];

    @OneToMany(() => TagEntity, (tag) => tag.user)
    tags: TagEntity[];
}
