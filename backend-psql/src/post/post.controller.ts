import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(private postService: PostService) {
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
        return this.postService.create({
            writer,
            title,
            content
        })
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
        return this.postService.update(id, {
            title,
            content
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.postService.delete(id);
    }
}
