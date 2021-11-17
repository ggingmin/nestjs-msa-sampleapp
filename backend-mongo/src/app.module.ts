import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://db_mongo:27017/nest', {
    autoCreate: true
  }), 
  PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
