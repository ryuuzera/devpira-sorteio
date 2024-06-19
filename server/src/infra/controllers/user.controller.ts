import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../../application/use-cases/createUser/createuser.dto';
import { CreateUserUseCase } from '../../application/use-cases/createUser/createuser.usecase';
import GetUserDTO from '../../application/use-cases/getUser/getuser.dto';
import { GetUserUseCase } from '../../application/use-cases/getUser/getuser.usecase';
import UpdateUserDTO from '../../application/use-cases/updateUser/updateuser.dto';
import { UpdateUserUseCase } from '../../application/use-cases/updateUser/updateuser.usecase';
import { PrismaUserRepository } from '../../domain/repositories/prisma.user.repository';
import { sendMessage } from '../server/socket';
import { objIsEmpty } from '../utils/object.utils';
import { handleErrorMessage } from '../utils/prisma.error-handler';
import { FileService } from '../../application/services/fileservice';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository());
    const fileService = new FileService();

    const user: CreateUserDTO = req.body; 

    try {
      const { file } = req;
      
      if (file) {
        const fileName = await fileService.processUserProfileImage(file.buffer);
        user.avatarUrl = fileName;
      }
    
      if (!file && user.avatarUrl) {
        const newFile = await fileService.downloadImageAsBuffer(user.avatarUrl);
        const fileName = await fileService.processUserProfileImage(newFile);
        user.avatarUrl = fileName;
      }

      const createdUser = await createUserUseCase.execute(user);
      sendMessage('user-created', createdUser);
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
      return res.status(400).send({ error: handleErrorMessage(err.message) });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateUserUseCase = new UpdateUserUseCase(new PrismaUserRepository());

    const updateUserDTO = plainToClass(UpdateUserDTO, req.body, {
      enableImplicitConversion: true,
    });

    try {
      await updateUserUseCase.execute(updateUserDTO);
      return res.status(200);
    } catch (err: any) {
      return res.status(400).send({ error: handleErrorMessage(err.message) });
    }
  }
}
