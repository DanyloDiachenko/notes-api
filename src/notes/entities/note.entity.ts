import { TagEntity } from "src/tags/entities/tag.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("notes")
export class NoteEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => TagEntity, (tag) => tag.note)
    tags!: TagEntity[];
}
