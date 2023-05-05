import express from 'express';
import TodoController from '../controllers/TodoController.js';
import AuthController from '../controllers/authController.js';

const todoRouter = express.Router();

todoRouter
  .route('/')
  .get(AuthController.protect, TodoController.getAllTodos)
  .post(TodoController.createTodo);
todoRouter
  .route('/:id')
  .get(TodoController.getTodo)
  .patch(TodoController.updateTodo)
  .delete(
    AuthController.protect,
    AuthController.restrictTo('admin'),
    TodoController.deleteTodo
  );

export default todoRouter;
