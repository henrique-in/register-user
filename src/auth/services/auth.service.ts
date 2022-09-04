import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../users/services/users.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
@ApiTags('Auth')
export class AuthService {

  constructor(private usersService: UsersService) {}
  
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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
