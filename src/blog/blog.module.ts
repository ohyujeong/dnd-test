import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { KeyWord, KeyWordSchema } from './schemas/keyword.schema';
import { PreWord, PreWordSchema } from './schemas/preWord.schema';
import { KeyWordRepository } from './keyword.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: KeyWord.name, schema: KeyWordSchema }]),
    MongooseModule.forFeature([{ name: PreWord.name, schema: PreWordSchema }])
  ],
  providers: [BlogService, KeyWordRepository],
  controllers: [BlogController]
})
export class BlogModule {}
