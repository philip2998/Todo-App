import { Request, Response, NextFunction } from 'express';
import TodoService from '../services/TodoService.js';
import AppError from '../utils/exceptions/AppError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';

export default class TodoController {
  static getAllTodos = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const todos = await TodoService.getAllTodos();
      sendSuccessResponse(res, 200, todos);
    }
  );

  static getTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const todo = await TodoService.getTodo(req.params.id);

      if (!todo)
        return next(new AppError('No Todo found with that ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, todo);
    }
  );

  static createTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newTodo = await TodoService.createTodo(req.body);
      sendSuccessResponse(res, 201, newTodo);
    }
  );

  static updateTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedTodo = await TodoService.updateTodo(req.params.id, req.body);

      if (!updatedTodo)
        return next(new AppError('No Todo found with that ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, updatedTodo);
    }
  );

  static deleteTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const deletedTodo = await TodoService.deleteTodo(req.params.id);

      if (!deletedTodo)
        return next(new AppError('No Todo found with tat ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, deletedTodo);
    }
  );
}
