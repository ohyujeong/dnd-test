import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log','error', 'warn'],
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ //파이프
    whitelist: true, //true로 설정하면 아무 데코레이터도 없는 어떠한 property의 object를 거릅니다.
    forbidNonWhitelisted: true, //문제되는 건 아예 request를 막음
		transform: true, //유저가 보내는 데이터를 원하는 타입으로 바꿔줌
  }));

  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('Test Swagger')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
