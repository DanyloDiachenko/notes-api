import { NoteEntity } from "src/notes/entities/note.entity";
import { UserEntity } from "src/users/entites/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("notes")
export class TagEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    slug!: string;

    @ManyToOne(() => UserEntity, (user) => user.tags)
    user!: UserEntity;

    @ManyToOne(() => NoteEntity, (note) => note.tags)
    note!: NoteEntity;
}
