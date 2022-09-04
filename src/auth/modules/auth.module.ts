import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from '../../users/modules/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy//local.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from '../strategy/jwt.strategy';
dotenv.config();


@Module({
  imports:[UsersModule,PassportModule, JwtModule.register({
    secret:process.env.JWT,
    signOptions:{expiresIn:'2d'}
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  exports:[AuthService],
})
export class AuthModule {}
