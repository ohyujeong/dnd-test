import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./passport/google.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
      PassportModule,
    ],
    providers: [GoogleStrategy, AuthService],
    controllers: [AuthController],
  })
  export class AuthModule {}