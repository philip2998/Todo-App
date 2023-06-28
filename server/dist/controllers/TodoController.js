import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import TodoService from '../services/TodoService.js';
import AppError from '../utils/exceptions/AppError.js';
export default class TodoController {
    todoService;
    constructor() {
        this.todoService = new TodoService();
    }
    getAllTodos = catchAsync(async (req, res) => {
        const todos = await this.todoService.getAllTodos();
        sendSuccessResponse(res, 200, todos);
    });
    getTodo = catchAsync(async (req, res, next) => {
        const todo = await this.todoService.getTodo(req.params.id);
        if (!todo)
            return next(new AppError("No Todo found with that ID", 404));
        sendSuccessResponse(res, 200, todo);
    });
    createTodo = catchAsync(async (req, res) => {
        const userId = req.user.id;
        const todo = {
            ...req.body,
            userId,
        };
        const newTodo = await this.todoService.createTodo(todo);
        sendSuccessResponse(res, 201, newTodo);
    });
    updateTodo = catchAsync(async (req, res, next) => {
        const updatedTodo = await this.todoService.updateTodo(req.params.id, req.body);
        if (!updatedTodo)
            return next(new AppError("No Todo found with that ID", 404));
        sendSuccessResponse(res, 200, updatedTodo);
    });
    deleteTodo = catchAsync(async (req, res, next) => {
        const deletedTodo = await this.todoService.deleteTodo(req.params.id);
        if (!deletedTodo)
            return next(new AppError("No Todo found with that ID", 404));
        sendSuccessResponse(res, 200, deletedTodo);
    });
}
//# sourceMappingURL=TodoController.js.map