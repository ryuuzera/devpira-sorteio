import express from 'express';
import { UserController } from '../controllers/user.controller';


const userRoutes = express.Router();
const userController = new UserController();

userRoutes.get('/', userController.get);

userRoutes.post('/', userController.create);

export default userRoutes;
