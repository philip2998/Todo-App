var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TodoService from '../services/TodoService.js';
import AppError from '../utils/exceptions/AppError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
export default class TodoController {
    constructor() {
        this.getAllTodos = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.todoService.getAllTodos();
            sendSuccessResponse(res, 200, todos);
        }));
        this.getTodo = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoService.getTodo(req.params.id);
            if (!todo)
                return next(new AppError('No Todo found with that ID', 404, 'Fail'));
            sendSuccessResponse(res, 200, todo);
        }));
        this.createTodo = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newTodo = yield this.todoService.createTodo(req.body);
            sendSuccessResponse(res, 201, newTodo);
        }));
        this.updateTodo = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const updatedTodo = yield this.todoService.updateTodo(req.params.id, req.body);
            if (!updatedTodo)
                return next(new AppError('No Todo found with that ID', 404, 'Fail'));
            sendSuccessResponse(res, 200, updatedTodo);
        }));
        this.deleteTodo = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const deletedTodo = yield this.todoService.deleteTodo(req.params.id);
            if (!deletedTodo)
                return next(new AppError('No Todo found with tat ID', 404, 'Fail'));
            sendSuccessResponse(res, 200, deletedTodo);
        }));
        this.todoService = new TodoService();
    }
}
//# sourceMappingURL=TodoController.js.map