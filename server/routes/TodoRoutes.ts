import express, { Router } from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import TodoController from '../controllers/TodoController.js';
import AuthController from '../controllers/AuthController.js';

const todoRouter: Router = express.Router();
const todoController = new TodoController();
const authController = new AuthController();

// Routes with authentication
todoRouter.use(routeGuard);

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
