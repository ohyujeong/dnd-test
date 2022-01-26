import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async googleLogin(req) {
    const user = await this.userModel.findOne({email: req.user.email})
    if(user){
      return '로그인!'
    }
    // console.log(req.user)
    // if (!req.user) {
    //   return 'No user from google';
    // }

    // return {
    //   message: 'User information from google',
    //   user: req.user,
    // };
  }
}