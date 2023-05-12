import express from 'express';
import TodoController from '../controllers/TodoController.js';
import protectRoutes from '../controllers/protectRoutes.js';
import AuthController from '../controllers/AuthController.js';

const todoRouter = express.Router();

todoRouter.use(protectRoutes);

todoRouter
  .route('/')
  .get(TodoController.getAllTodos)
  .post(TodoController.createTodo);
todoRouter
  .route('/:id')
  .get(TodoController.getTodo)
  .patch(TodoController.updateTodo)
  .delete(AuthController.checkPermissions('admin'), TodoController.deleteTodo);

export default todoRouter;
