import { PrismaClient, User } from '@prisma/client';
import IRepository from '../../../../domain/@types/repository';

const prisma = new PrismaClient();

export class UserRepository implements IRepository<User> {
  async create(object: Omit<User, 'id'>): Promise<User | null> {
    return await prisma.user.create({ data: object });
  }

  async update(object: {
    id: number;
    name: string;
    avatarUrl: string;
    email: string;
    winnerId: number | null;
  }): Promise<boolean> {
    const success = await prisma.user.update({
      where: {
        id: Number(object.id),
      },
      data: {
        ...object,
      },
    });
    return success?.id > 0;
  }

  async list(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }
  async get(id: string | number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  }

  async delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
