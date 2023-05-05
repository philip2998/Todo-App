import Todo from '../models/todoModel.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export default class TodoController {
  static getAllTodos = catchAsync(async (req, res, next) => {
    const todos = await Todo.find();

    sendSuccessResponse(res, 200, todos);
  });

  static getTodo = catchAsync(async (req, res, next) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return next(new AppError('No todo found with that ID', 404));

    sendSuccessResponse(res, 200, todo);
  });

  static createTodo = catchAsync(async (req, res, next) => {
    const newTodo = await Todo.create(req.body);

    sendSuccessResponse(res, 201, newTodo);
  });

  static updateTodo = catchAsync(async (req, res, next) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo)
      return next(new AppError('No todo found with that ID', 404));

    sendSuccessResponse(res, 200, updatedTodo);
  });

  static deleteTodo = catchAsync(async (req, res, next) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo)
      return next(new AppError('No todo found with that ID', 404));

    sendSuccessResponse(res, 204, null);
  });
}
