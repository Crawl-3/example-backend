// @ts-nocheck
import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post {
    @ObjectIdColumn()
    id: number;
    @Column()
    author: string;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column("simple-json")
    details: {
        createdAt: Date;
    };
}
