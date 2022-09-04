import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request  } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  create(@Request() req, @Body() createAuthDto: CreateAuthDto) {
    // return req.user ;
    return this.authService.login(req.user) ;
  }
}
