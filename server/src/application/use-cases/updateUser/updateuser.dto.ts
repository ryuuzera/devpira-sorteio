import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateUserDTO {
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  winnerId?: number | null;
}
