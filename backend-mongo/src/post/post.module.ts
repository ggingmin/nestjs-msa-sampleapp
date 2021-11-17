import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { Post, PostSchema } from './post.model';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Post.name, schema: PostSchema}
    ])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
