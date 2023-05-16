var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import TodoService from '../services/TodoService.js';
import AppError from '../utils/exceptions/AppError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
class TodoController {
}
_a = TodoController;
TodoController.getAllTodos = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield TodoService.getAllTodos();
    sendSuccessResponse(res, 200, todos);
}));
TodoController.getTodo = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield TodoService.getTodo(req.params.id);
    if (!todo)
        return next(new AppError('No Todo found with that ID', 404, 'Fail'));
    sendSuccessResponse(res, 200, todo);
}));
TodoController.createTodo = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield TodoService.createTodo(req.body);
    sendSuccessResponse(res, 201, newTodo);
}));
TodoController.updateTodo = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTodo = yield TodoService.updateTodo(req.params.id, req.body);
    if (!updatedTodo)
        return next(new AppError('No Todo found with that ID', 404, 'Fail'));
    sendSuccessResponse(res, 200, updatedTodo);
}));
TodoController.deleteTodo = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTodo = yield TodoService.deleteTodo(req.params.id);
    if (!deletedTodo)
        return next(new AppError('No Todo found with tat ID', 404, 'Fail'));
    sendSuccessResponse(res, 200, deletedTodo);
}));
export default TodoController;
//# sourceMappingURL=TodoController.js.map