import { PrismaClient } from '@prisma/client';
import GetUserDTO from '../../application/use-cases/getUser/getuser.dto';
import UpdateUserDTO from '../../application/use-cases/updateUser/updateuser.dto';
import prisma from '../../infra/db/prismaclient';
import IRepository from './@types/irepository';
import { CreateUserDTO } from '../../application/use-cases/createUser/createuser.dto';
import User from '../entities/user';

export class PrismaUserRepository implements IRepository<User> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(object: CreateUserDTO): Promise<User | null> {
    return await this.prisma.user.create({ data: object });
  }

  async update(object: UpdateUserDTO): Promise<boolean> {
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
      include: {
        winner: true,
      },
    });

    return users as User[];
  }

  async get(data?: GetUserDTO): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        ...(data as any),
      },
      include: {
        winner: true,
      },
    });

    return user as User;
  }

  async delete(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
