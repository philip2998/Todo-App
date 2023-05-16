import TodoRepository from '../repositories/TodoRepository.js';

export default class TodoService {
  static async getAllTodos() {
    return await TodoRepository.getAllData();
  }

  static async getTodo(id: string) {
    return await TodoRepository.getOneData(id);
  }

  static async createTodo(data: object) {
    return await TodoRepository.createOneData(data);
  }

  static async updateTodo(id: string, data: object) {
    return await TodoRepository.updateOneData(id, data);
  }

  static async deleteTodo(id: string) {
    return await TodoRepository.deleteOneData(id);
  }
}
