import TodoService from '../services/TodoService.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export default class TodoController {
  static getAllTodos = catchAsync(async (req, res, next) => {
    const todos = await TodoService.getAllTodos();
    sendSuccessResponse(res, 200, todos);
  });

  static getTodo = catchAsync(async (req, res, next) => {
    const todo = await TodoService.getTodo(req.params.id);

    if (!todo) return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, todo);
  });

  static createTodo = catchAsync(async (req, res, next) => {
    const newTodo = await TodoService.createTodo(req.body);
    sendSuccessResponse(res, 201, newTodo);
  });

  static updateTodo = catchAsync(async (req, res, next) => {
    const updatedTodo = await TodoService.updateTodo(req.params.id, req.body);

    if (!updatedTodo)
      return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, updatedTodo);
  });

  static deleteTodo = catchAsync(async (req, res, next) => {
    const deletedTodo = await TodoService.deleteTodo(req.params.id);

    if (!deletedTodo)
      return next(new AppError('No Document found with tat ID', 404));

    sendSuccessResponse(res, 200, deletedTodo);
  });
}
