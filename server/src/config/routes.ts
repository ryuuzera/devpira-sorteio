import express from 'express';
import userRoutes from '../infra/routes/user.routes';
import winnerRoutes from '../infra/routes/winner.routes';

const routes = express();

routes.use('/user', userRoutes);
routes.use('/winner', winnerRoutes)

export default routes;
