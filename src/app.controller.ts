import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';


@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get('/count')
  getHello(@Req() request: Request, /*@Res() response: Response*/): string {
    // var visitors = request.cookies.visitors || 0;
    // console.log(visitors);

    // visitors++;

    // response.cookie('visitors', visitors, {
    //   maxAge: 99999999
    // });

    console.log(request.cookies);
    console.log(request.signedCookies);
    return "ddd";

    // return `visitors: ${visitors}`
    // return this.appService.getHello();
  }
}