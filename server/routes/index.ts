import express, { Router } from 'express';
import UserRoutes from './UserRoutes.js';
import TodoRouter from './TodoRoutes.js';

const routes: Router = express.Router();

const todoRoutes: TodoRouter = new TodoRouter();
routes.use('/todos', todoRoutes.router);

const userRoutes: UserRoutes = new UserRoutes();
routes.use('/users', userRoutes.router);

export default routes;
