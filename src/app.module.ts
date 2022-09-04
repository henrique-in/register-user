import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/modules/users.module';
import { AuthModule } from './auth/modules/auth.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db',
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
