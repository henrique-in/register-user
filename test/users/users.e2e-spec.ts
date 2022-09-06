import { Test, TestingModule } from '@nestjs/testing';
import { Body, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserDto } from '../../src/users/dto/create-user.dto';

describe('Users', () => {
  let app: INestApplication;

  const userCreate = {
    name: 'Teste Create',
    email: 'testecreate@gmail.com',
    password: '12345678'
  }

  const userPatch = {
    name: "Henrique Oliveira",
    email: "henrique.fsa97@hotmail.com",
    password: "12345678"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeOrmModule.forRoot({
        type:'sqlite',
        database:'db',
        synchronize:true,
        autoLoadEntities: true,
      })],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('Get Users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
  });


  it('Get Users id', () => {
    return request(app.getHttpServer())
      .get('/users/6')
      .expect(HttpStatus.OK)
  
  });


  it('Create Users', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(userCreate as CreateUserDto)
      .expect(HttpStatus.CREATED)
  });

  it('Patch Users', () => {
    return request(app.getHttpServer())
      .patch('/users/6')
      .send(userPatch)
      .expect(HttpStatus.OK)
  });

  

  it('Delete User', () => {
    return request(app.getHttpServer())
      .delete('/users/9')
      .expect(HttpStatus.OK)
  });

});
