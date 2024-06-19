import express from 'express';
import { UserController } from '../controllers/user.controller';
import upload from '../middleware/img-upload.middleware';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.get('/', userController.get);

userRoutes.post('/', upload.single('file'), userController.create);

userRoutes.put('/', userController.update);

export default userRoutes;
