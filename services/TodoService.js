import TodoRepository from '../repositories/TodoRepository.js';

export default class TodoService {
  static async getAllTodos() {
    return await TodoRepository.getAllData();
  }

  static async getTodo(id) {
    return await TodoRepository.getOneData(id);
  }

  static async createTodo(data) {
    return await TodoRepository.createOneData(data);
  }

  static async updateTodo(id, data) {
    return await TodoRepository.updateOneData(id, data);
  }

  static async deleteTodo(id, active) {
    return await TodoRepository.deleteOneData(id, data);
  }
}
