import { NoteEntity } from "src/notes/entities/note.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("notes")
export class TagEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    slug!: string;

    @ManyToOne(() => NoteEntity, (note) => note.tags)
    note!: NoteEntity;
}
