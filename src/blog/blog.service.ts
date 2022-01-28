import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const totalPost = await this.postModel.count();
    console.log(totalPost);
    createPostDTO.blogId = totalPost + 1;
    console.log(createPostDTO)
    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }

  async getPost(id: Number): Promise<Post> {
    const post = await this.postModel.findOne({blogId: id});
    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async editPost(id: Number, updatePostDTO: UpdatePostDTO): Promise<Post> {
    const editedPost = await this.postModel
      .findOneAndUpdate({blogId: id}, updatePostDTO, { new: true });
    return editedPost;
  }

  async deletePost(id: Number): Promise<any> {
    const deletedPost = await this.postModel
      .findOneAndRemove({blogId: id});
    return deletedPost;
  }
} 