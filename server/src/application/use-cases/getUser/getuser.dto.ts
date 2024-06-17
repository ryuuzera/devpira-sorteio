import { IsEmail, IsNumber, IsOptional } from 'class-validator';

export default class GetUserDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsEmail()
  email?: string;
}
