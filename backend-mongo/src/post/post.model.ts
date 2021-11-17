import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PostDocument = Post & Document;

@Schema()
export class Post {

    @Prop()
    id: number;

    @Prop()
    writer: string;

    @Prop()
    title: string;

    @Prop()
    content: string

    @Prop()
    likes: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);