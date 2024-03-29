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
  .route('/alltodos')
  .get(authController.checkPermissions('admin'), todoController.getAllTodos);

todoRouter
  .route('/main/:id')
  .get(todoController.getUserTodos)
  .post(todoController.createTodo);

todoRouter
  .route('/main/:id/:id')
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

export default todoRouter;
