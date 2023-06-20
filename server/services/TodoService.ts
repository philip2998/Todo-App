import { todoRepository } from '../repositories/todoRepository.js';

export default class TodoService {
  private todoRepository;

  constructor() {
    this.todoRepository = todoRepository;
  }
  public async getAllTodos() {
    return await this.todoRepository.getAllData();
  }

  public async getTodo(id: string) {
    return await this.todoRepository.getOneData(id);
  }

  public async createTodo(data: object) {
    return await this.todoRepository.createOneData(data);
  }

  public async updateTodo(id: string, data: object) {
    return await this.todoRepository.updateOneData(id, data);
  }

  public async deleteTodo(id: string) {
    return await this.todoRepository.deleteOneData(id);
  }
}
