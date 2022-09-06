import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { NotFoundError } from '../errors/NotFoundError';

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
    if(!user){
      throw new NotFoundError('Usuario não encontrado')
    }
    return user
  }

 async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await  this.userRepository.findOneBy({id:id}) 
    if(!user){
      throw new NotFoundError('Usuario não encontrado')
    }
    return
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.userRepository.delete(id);
    return
  }

  async findUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({email: email});

  }

}
