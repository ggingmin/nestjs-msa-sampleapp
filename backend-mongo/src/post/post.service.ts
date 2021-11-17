import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { threadId } from 'worker_threads';
import { Post, PostDocument } from './post.model';

@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>
    ) {

    }

    async all(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    async create(data): Promise<Post> {
        return new this.postModel(data).save()
    }

    async findOne(id: number): Promise<Post> {
        return this.postModel.findById({id});
    }

    async getOne(id: number): Promise<Post> {
        return this.postModel.findOne({id});
    }

    async update(id: number, data): Promise<any> {
        return this.postModel.findOneAndUpdate({id}, data);
    }

    async delete(id: number): Promise<void> {
        this.postModel.deleteOne({id});
    }
}
