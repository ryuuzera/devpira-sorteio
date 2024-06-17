import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../../application/use-cases/createUser/createuser.dto';
import { CreateUserUseCase } from '../../application/use-cases/createUser/createuser.usecase';
import  GetUserDTO  from '../../application/use-cases/getUser/getuser.dto';
import { GetUserUseCase } from '../../application/use-cases/getUser/getuser.usecase';
import { PrismaUserRepository } from '../../domain/repositories/prisma.user.repository';
import { objIsEmpty } from '../utils/object.utils';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository());

    const user: CreateUserDTO = req.body;

    try {
      await createUserUseCase.execute(user);
      return res.status(201).send();
    } catch (err: any) {
      return res.status(400).send({ error: err.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    const getUserUseCase = new GetUserUseCase(new PrismaUserRepository());

    const getUserDTO = plainToClass(GetUserDTO, req.query, {
      enableImplicitConversion: true,
    });

    try {
      const result = await getUserUseCase.execute(!objIsEmpty(getUserDTO) ? getUserDTO : undefined);
      return res.status(200).send(result);
    } catch (err: any) {
      return res.status(400).send({ error: err.message });
    }
  }
}
