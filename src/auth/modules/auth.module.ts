import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from '../../users/modules/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy//local.strategy';


@Module({
  imports:[UsersModule,PassportModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
  exports:[AuthService],
})
export class AuthModule {}
