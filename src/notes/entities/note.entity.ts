import { TagEntity } from "src/tags/entities/tag.entity";
import { UserEntity } from "src/users/entites/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
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

    @ManyToOne(() => UserEntity, (user) => user.notes)
    user!: UserEntity;

    @Column()
    isArchived!: boolean;
}
