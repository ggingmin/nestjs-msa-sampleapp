import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.model';

@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>
    ) {

    }

    async all() {
        return this.postModel.find().exec();
    }
}
