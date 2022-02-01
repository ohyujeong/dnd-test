import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./passport/google.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports: [
      PassportModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [GoogleStrategy, AuthService, ],
    controllers: [AuthController],
  })
  export class AuthModule {}