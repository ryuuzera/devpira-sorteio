import User from '../../../domain/entities/user';
import IRepository from '../../../domain/repositories/@types/irepository';
import { CreateUserDTO } from './createuser.dto';

export class CreateUserUseCase {
  constructor(private userRepository: IRepository<User>) {}

  async execute(data: CreateUserDTO) {
    return await this.userRepository.create(data);
  }
}
