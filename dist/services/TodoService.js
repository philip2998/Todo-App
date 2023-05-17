var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TodoRepository from '../repositories/TodoRepository.js';
export default class TodoService {
    constructor() {
        this.todoRepository = new TodoRepository();
    }
    getAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepository.getAllData();
        });
    }
    getTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepository.getOneData(id);
        });
    }
    createTodo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepository.createOneData(data);
        });
    }
    updateTodo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepository.updateOneData(id, data);
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepository.deleteOneData(id);
        });
    }
}
//# sourceMappingURL=TodoService.js.map