import { IsEmail, IsNumber, IsOptional } from 'class-validator';

interface IGetUserDTO {
  id?: number;
  email?: string;
}

export class GetUserDTO implements IGetUserDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsEmail()
  email?: string;
}
