import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  googleLogin(req) {
    console.log(req.user)
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}