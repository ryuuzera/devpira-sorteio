import { PrismaClient } from '@prisma/client';
import { CreateWinnerDTO } from '../../application/use-cases/createWinner/createwinner.dto';
import prisma from '../../infra/db/prismaclient';
import { Winner } from '../entities/user';
import IRepository from './@types/irepository';

export class PrismaWinnerRepository implements IRepository<Winner> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async list(options: any): Promise<Winner[]> {
    throw new Error('Method not implemented.');
  }
  async get(options: any): Promise<Winner | null> {
    throw new Error('Method not implemented.');
  }
  async create(object: CreateWinnerDTO): Promise<Winner | null> {
    const winner = await prisma.winner.create({
      data: {
        ...(object as any),
      },
    });
    return winner as Winner;
  }
  async update(object: Winner): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
