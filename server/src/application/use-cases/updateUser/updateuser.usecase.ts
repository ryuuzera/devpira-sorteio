import IRepository from '../../../domain/repositories/@types/irepository';
import UpdateUserDTO from './updateuser.dto';

export class UpdateUserUseCase {
  constructor(private userRepository: IRepository<UpdateUserDTO>) {}

  async execute(data: UpdateUserDTO): Promise<boolean> {
    return await this.userRepository.update(data);
  }
}
