import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name:string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email:string;

  @IsNotEmpty()
  @ApiProperty()
  password:string;
}
