import { TagEntity } from "src/tags/entities/tag.entity";
import { UserEntity } from "src/users/entites/user.entity";
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("notes")
export class NoteEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => TagEntity, (tag) => tag.notes)
    tags: TagEntity[];

    @ManyToOne(() => UserEntity, (user) => user.notes)
    user: UserEntity;

    @Column()
    isArchived: boolean;
}
