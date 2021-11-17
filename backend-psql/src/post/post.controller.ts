import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(
        private postService: PostService,
        @Inject('POST_SERVICE') private readonly client: ClientProxy
    ) {
    }

    @Get()  
    async all() {
        return this.postService.all()
    }

    @Post()
    async create(
        @Body('writer') writer: string,
        @Body('title') title: string,
        @Body('content') content: string
    ) {
        const post = await this.postService.create({
            writer,
            title,
            content
        });

        this.client.emit('post_created', post);
        return post;
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.postService.get(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('content') content: string        
    ) {
        await this.postService.update(id, {
            title,
            content
        });

        const post = await this.postService.get(id);
        this.client.emit('post_updated', post);
        return post;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.postService.delete(id);

        this.client.emit('post_deleted', id);
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const post = await this.postService.get(id);
        return this.postService.update(id, {
            likes: post.likes + 1
        });
    }
}
