import { Column, OneToMany, UpdateDateColumn } from "typeorm";

export class NoteEntity {
    @Column()
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
