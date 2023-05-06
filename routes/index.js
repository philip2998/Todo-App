import express from 'express';
import todoRouter from './todoRoutes.js';
import userRouter from './userRoutes.js';

const routes = express.Router();

routes.use('/todos', todoRouter);
routes.use('/users', userRouter);

export default routes;
