import express from 'express';
import { WinnerController } from '../controllers/winner.controller';

const winnerRoutes = express.Router();
const winnerController = new WinnerController();

// winnerRoutes.get('/', winnerController.get);

winnerRoutes.post('/', winnerController.create);

// winnerRoutes.put('/', winnerController.update);

export default winnerRoutes;
