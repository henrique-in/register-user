import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './database/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) 
    private userRepository: Repository<UserEntity>){}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new CreateUserDto()
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(createUserDto.password, salt)

    user.name = createUserDto.name
    user.email = createUserDto.email
    user.password = password

    return await this.userRepository.save(user)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({id:id});
    return user
  }

 async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id,updateUserDto)
    return
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.userRepository.delete(id);
    return
  }
}
