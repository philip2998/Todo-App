import express, { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './UserRoutes.js';
import todoRouter from './TodoRoutes.js';

const routes: Router = express.Router();

routes.use(authRouter);
routes.use('/users', userRouter);
routes.use('/todos', todoRouter);

export default routes;
