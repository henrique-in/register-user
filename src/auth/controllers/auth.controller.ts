import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request  } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.validateUser(createAuthDto.email, createAuthDto.password)
  // }

  // @Post('login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  create(@Request() req, @Body() createAuthDto: CreateAuthDto) {
    return req.user ;
  }
}
