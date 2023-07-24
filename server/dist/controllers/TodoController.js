import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import errorHandler from '../middlewares/errorMiddleware.js';
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
            return next(errorHandler(new AppError("No Todo found with that ID!", 404), req, res, next));
        sendSuccessResponse(res, 200, todo);
    });
    getUserTodos = catchAsync(async (req, res, next) => {
        const userId = req.user.id;
        const todos = await this.todoService.getUserTodos(userId);
        sendSuccessResponse(res, 200, todos);
    });
    createTodo = catchAsync(async (req, res, next) => {
        const userId = req.user.id;
        const userName = req.user.name;
        const todoTitle = req.body.title;
        const todo = {
            ...req.body,
            userId,
            userName,
        };
        const existedTodo = await this.todoService.findOneTodo({
            title: todoTitle,
        });
        if (existedTodo && existedTodo.userId === userId) {
            return next(errorHandler(new AppError("This todo is already exist. Please create another", 400), req, res, next));
        }
        const newTodo = await this.todoService.createTodo(todo);
        sendSuccessResponse(res, 201, newTodo);
    });
    updateTodo = catchAsync(async (req, res, next) => {
        const updatedTodo = await this.todoService.updateTodo(req.params.id, req.body);
        if (!updatedTodo)
            return next(errorHandler(new AppError("No Todo found with that ID!", 404), req, res, next));
        sendSuccessResponse(res, 200, updatedTodo);
    });
    deleteTodo = catchAsync(async (req, res, next) => {
        const deletedTodo = await this.todoService.deleteTodo(req.params.id);
        if (!deletedTodo)
            return next(errorHandler(new AppError("No Todo found with that ID!", 404), req, res, next));
        sendSuccessResponse(res, 200, deletedTodo);
    });
}
//# sourceMappingURL=TodoController.js.map