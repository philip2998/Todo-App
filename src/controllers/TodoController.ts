import { Request, Response, NextFunction } from 'express';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import TodoService from '../services/TodoService.js';
import AppError from '../utils/exceptions/AppError.js';

export default class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  public getAllTodos = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const todos = await this.todoService.getAllTodos();
      sendSuccessResponse(res, 200, todos);
    }
  );

  public getTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const todo = await this.todoService.getTodo(req.params.id);

      if (!todo)
        return next(new AppError('No Todo found with that ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, todo);
    }
  );

  public createTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newTodo = await this.todoService.createTodo(req.body);
      sendSuccessResponse(res, 201, newTodo);
    }
  );

  public updateTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedTodo = await this.todoService.updateTodo(
        req.params.id,
        req.body
      );

      if (!updatedTodo)
        return next(new AppError('No Todo found with that ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, updatedTodo);
    }
  );

  public deleteTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const deletedTodo = await this.todoService.deleteTodo(req.params.id);

      if (!deletedTodo)
        return next(new AppError('No Todo found with tat ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, deletedTodo);
    }
  );
}
