import { Header, Injectable, Res } from '@nestjs/common';
import passport from 'passport';
// const KakaoStrategy = require('passport-kakao').Strategy

var count=0;

@Injectable()
export class AppService {
  getHello(): string {
    count++;
    return 'DND TEST test22 브랜치 22';
  }
}
