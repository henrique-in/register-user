import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../users/services/users.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@ApiTags('Auth')
export class AuthService {

  constructor(
    private usersService: UsersService, 
    private readonly jwtService: JwtService) {}

  login(user: UserEntity) {
    const payload = {
      id:user.id,
      name:user.name,
      email:user.email
    } 
    const jwtToken = this.jwtService.sign(payload)

    return {
      access_token: jwtToken
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(email);
    if (user) {
     const IsPassword = await bcrypt.compareSync(password, user.password)
      
     if(IsPassword){
      const { ...result } = user;
      return result;
     }
      
    }
    return null;
  }
}
