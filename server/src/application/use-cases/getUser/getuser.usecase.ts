import User from '../../../domain/entities/user';
import IRepository from '../../../domain/repositories/@types/irepository';
import { GetUserDTO } from './getuser.dto';

export class GetUserUseCase {
  constructor(private userRepository: IRepository<User>) {}

  async execute(data?: GetUserDTO): Promise<User | User[] | null> {
    if (data?.id && data?.id > 0) {
      return await this.userRepository.get(data);
    }

    return await this.userRepository.list(data);
  }
}
