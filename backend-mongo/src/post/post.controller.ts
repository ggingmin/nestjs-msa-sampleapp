import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(private postService: PostService) {
    }

    @Get()
    async all() {
        return this.postService.all()
    }

    @EventPattern('hey')
    async hey(data: string) {
        console.log(data);
    }
}
