import { NoteEntity } from "src/notes/entities/note.entity";
import { UserEntity } from "src/users/entites/user.entity";
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";

@Unique(["title"])
@Entity("tags")
export class TagEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    slug: string;

    @ManyToOne(() => UserEntity, (user) => user.tags)
    user: UserEntity;

    @ManyToMany(() => NoteEntity, (note) => note.tags)
    @JoinTable({
        name: "note_tags",
        joinColumn: { name: "tag_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "note_id", referencedColumnName: "id" },
    })
    notes: NoteEntity[];
}
