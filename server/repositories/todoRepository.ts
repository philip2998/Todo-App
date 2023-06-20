import Repository from '../repositories/Repository.js';
import Todo from '../models/todoModel.js';

export const todoRepository = new Repository(Todo);
