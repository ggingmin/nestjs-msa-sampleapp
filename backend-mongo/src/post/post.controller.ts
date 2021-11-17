import { HttpModule, HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(
        private postService: PostService,
        private httpService: HttpService
    ) {
    }

    @Get()
    async all() {
        return this.postService.all()
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        const post = await this.postService.getOne(id);
        return post;
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const post = await this.postService.getOne(id);

        this.httpService.post(`http://backend-psql:8000/api/posts/${id}/like`, {}).subscribe(
            res => {
                console.log(res);
            }
        )
        return this.postService.update(id, {
            likes: post.likes + 1
        });
    }

    @EventPattern('post_created')
    async postCreated(post: any) {
        await this.postService.create({
            id: post.id,
            writer: post.writer,
            title: post.title,
            content: post.content,
            likes: post.likes,
        });
    }

    @EventPattern('post_updated')
    async postUpdated(post: any) {
        await this.postService.update(post.id, {
            title: post.title,
            content: post.content,
        });
    }

    @EventPattern('post_deleted')
    async postDeleted(id: number) {
        await this.postService.delete(id);
    }

}
