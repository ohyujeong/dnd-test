import { Header, Injectable, Res } from '@nestjs/common';
import passport from 'passport';
// const KakaoStrategy = require('passport-kakao').Strategy

@Injectable()
export class AppService {
  getHello(): string {
    return 'DND TEST test22 브랜치 22';
  }
}
