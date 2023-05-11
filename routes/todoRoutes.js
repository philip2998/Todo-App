import express from 'express';
import TodoController from '../controllers/TodoController.js';
import protect from '../controllers/protect.js';
import AuthController from '../controllers/AuthController.js';

const todoRouter = express.Router();

todoRouter
  .route('/')
  .get(protect, TodoController.getAllTodos)
  .post(TodoController.createTodo);
todoRouter
  .route('/:id')
  .get(TodoController.getTodo)
  .patch(TodoController.updateTodo)
  .delete(
    protect,
    AuthController.checkPermissions('admin'),
    TodoController.deleteTodo
  );

export default todoRouter;
