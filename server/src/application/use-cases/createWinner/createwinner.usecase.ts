import { Winner } from '../../../domain/entities/user';
import IRepository from '../../../domain/repositories/@types/irepository';
import { CreateWinnerDTO } from './createwinner.dto';

export class CreateWinnerUseCase {
  constructor(private winnerRepository: IRepository<Winner>) {}

  async execute(data: CreateWinnerDTO) {
    return await this.winnerRepository.create(data);
  }
}
