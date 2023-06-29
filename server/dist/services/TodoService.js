import { todoRepository } from '../repositories/todoRepository.js';
export default class TodoService {
    todoRepository;
    constructor() {
        this.todoRepository = todoRepository;
    }
    async getAllTodos() {
        return await this.todoRepository.getAllData();
    }
    async getTodo(id) {
        return await this.todoRepository.getOneData(id);
    }
    async getUserTodos(userId) {
        return await this.todoRepository.getUserTodos(userId);
    }
    async createTodo(data) {
        return await this.todoRepository.createOneData(data);
    }
    async updateTodo(id, data) {
        return await this.todoRepository.updateOneData(id, data);
    }
    async deleteTodo(id) {
        return await this.todoRepository.deleteOneData(id);
    }
}
//# sourceMappingURL=TodoService.js.map