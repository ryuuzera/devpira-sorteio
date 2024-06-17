import { User } from '.prisma/client';
import express from 'express';
import { UserRepository } from '../../infra/db/postgres/user/user-postgres.repository';

const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
  const users = await new UserRepository().list();
  res.json(users);
});

userRoutes.post('/', async (req, res) => {
  const user: Omit<User, 'id'> = req.body;
  const result = await new UserRepository().create(user);
  res.json(result);
});

export default userRoutes;
