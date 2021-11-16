import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    writer: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({default: 0})
    likes: number;
}