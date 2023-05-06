import express from 'express';
import TodoController from '../controllers/TodoController.js';
import protect from '../middlewares/protect.js';
import restrictTo from '../middlewares/restrictTo.js';

const todoRouter = express.Router();

todoRouter
  .route('/')
  .get(protect, TodoController.getAllTodos)
  .post(TodoController.createTodo);
todoRouter
  .route('/:id')
  .get(TodoController.getTodo)
  .patch(TodoController.updateTodo)
  .delete(protect, restrictTo('admin'), TodoController.deleteTodo);

export default todoRouter;
