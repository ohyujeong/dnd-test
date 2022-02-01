import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { KeyWordRepository } from './keyword.repository';
import { KeyWord } from './schemas/keyword.schema';
import { Schedule } from 'node-schedule';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>,
    private readonly keyWordRepository: KeyWordRepository) { }

  
  async test(): Promise<any> {
    return this.keyWordRepository.test();
  }

  async addKeyWord(createKeyWordDto): Promise<KeyWord> {
    return this.keyWordRepository.saveKeyWord(createKeyWordDto);
  }

  async getKeyWord(): Promise<KeyWord[]> {
    return this.keyWordRepository.findKeyWord();
  }

  // j = Schedule.scheduleJob('0 17 ? * 0,4-6', function(){
  //   console.log('일, 목, 금, 토 중 실행 날짜 17시 0분에 실행');
  // });

  async getRandom(){
    return await this.keyWordRepository.findRandom();
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const totalPost = await this.postModel.count();
    console.log(totalPost);
    createPostDTO.blogId = totalPost + 1;
    console.log(createPostDTO)
    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }

  async getPost(id: Number): Promise<Post> {
    const post = await this.postModel.findOne({ blogId: id });
    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async editPost(id: Number, updatePostDTO: UpdatePostDTO): Promise<Post> {
    const editedPost = await this.postModel
      .findOneAndUpdate({ blogId: id }, updatePostDTO, { new: true });
    return editedPost;
  }

  async deletePost(id: Number): Promise<any> {
    const deletedPost = await this.postModel
      .findOneAndRemove({ blogId: id });
    return deletedPost;
  }
} 