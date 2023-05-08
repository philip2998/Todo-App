import Todo from '../models/todoModel.js';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './HandlerFactory.js';

export default class TodoController {
  static getAllTodos = getAll(Todo);

  static getTodo = getOne(Todo);

  static createTodo = createOne(Todo);

  static updateTodo = updateOne(Todo);

  static deleteTodo = deleteOne(Todo);
}
