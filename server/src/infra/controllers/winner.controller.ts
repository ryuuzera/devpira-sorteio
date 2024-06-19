import { Request, Response } from 'express';
import { CreateWinnerUseCase } from '../../application/use-cases/createWinner/createwinner.usecase';
import { PrismaWinnerRepository } from '../../domain/repositories/prisma.winner.repository';

export class WinnerController {
  async create(req: Request, res: Response): Promise<Response> {
    const createWinnerUseCase = new CreateWinnerUseCase(new PrismaWinnerRepository());

    const winnerDTO = req.body;

    try {
      await createWinnerUseCase.execute(winnerDTO);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
