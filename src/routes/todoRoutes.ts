import express, { Router } from 'express';
import TodoController from '../controllers/TodoController.js';
import ProtectRoutes from '../controllers/ProtectRoutes.js';
import AuthController from '../controllers/AuthController.js';

const todoRouter: Router = express.Router();
const todoController: TodoController = new TodoController();
const authController: AuthController = new AuthController();
const protectRoutes: ProtectRoutes = new ProtectRoutes();

todoRouter.use(protectRoutes.routeGuard);

todoRouter
  .route('/')
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);
todoRouter
  .route('/:id')
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(authController.checkPermissions('admin'), todoController.deleteTodo);

export default todoRouter;
