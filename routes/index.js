import express from 'express';
import todoRouter from './todoRoutes.js';
import userRouter from './userRoutes.js';
import viewRouter from './viewRoutes.js';

const routes = express.Router();

routes.use('/', viewRouter);
routes.use('/todos', todoRouter);
routes.use('/users', userRouter);

export default routes;
