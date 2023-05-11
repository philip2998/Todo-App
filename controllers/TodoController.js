import TodoService from '../services/TodoService.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export default class TodoController {
  static getAllTodos = catchAsync(async (req, res, next) => {
    const users = await TodoService.getAllTodos();
    sendSuccessResponse(res, 200, users);
  });

  static getTodo = catchAsync(async (req, res, next) => {
    const user = await TodoService.getTodo(req.params.id);

    if (!user) return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, user);
  });

  static createTodo = catchAsync(async (req, res, next) => {
    const newUser = await TodoService.createTodo(req.body);
    sendSuccessResponse(res, 201, newUser);
  });

  static updateTodo = catchAsync(async (req, res, next) => {
    const updatedUser = await TodoService.updateTodo(req.params.id, req.body);

    if (!updatedUser)
      return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, updatedUser);
  });

  static deleteTodo = catchAsync(async (req, res, next) => {
    const deletedTodo = await TodoService.deleteTodo(req.params.id);

    if (!deletedTodo)
      return next(new AppError('No Document found with tat ID', 404));

    sendSuccessResponse(res, 200, deletedTodo);
  });
}
