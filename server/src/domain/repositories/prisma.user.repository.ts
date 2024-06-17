import { PrismaClient, User } from '@prisma/client';
import { GetUserDTO } from '../../application/use-cases/getUser/getuser.dto';
import IRepository from './@types/irepository';

export class PrismaUserRepository implements IRepository<User> {
  private prisma = new PrismaClient();

  async create(object: Omit<User, 'id'>): Promise<User | null> {
    return await this.prisma.user.create({ data: object });
  }

  async update(object: { id: number; name: string; avatarUrl: string; email: string; winnerId: number | null }): Promise<boolean> {
    const success = await this.prisma.user.update({
      where: {
        id: Number(object.id),
      },
      data: {
        ...object,
      },
    });

    return success?.id > 0;
  }

  async list(data?: GetUserDTO): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        ...data,
      },
    });

    return users;
  }

  async get(data?: GetUserDTO): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        ...(data as any),
      },
    });

    return user;
  }

  async delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
