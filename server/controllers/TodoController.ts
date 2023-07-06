import { Request, Response, NextFunction } from 'express';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import { ITodoSchema } from '../interfaces/modelInterfaces.js';
import { ErrorType } from '../utils/enums/index.js';
import TodoService from '../services/TodoService.js';
import AppError from '../utils/exceptions/AppError.js';
import errorHandler from '../middlewares/errorMiddleware.js';

export default class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  public getAllTodos = catchAsync(async (req: Request, res: Response) => {
    const todos: ITodoSchema[] = await this.todoService.getAllTodos();
    sendSuccessResponse(res, 200, todos);
  });

  public getTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const todo: ITodoSchema | null = await this.todoService.getTodo(
        req.params.id
      );

      if (!todo)
        return next(
          errorHandler(
            new AppError(ErrorType.TODO_NOT_FOUND, ErrorType.NOT_FOUND),
            req,
            res,
            next
          )
        );

      sendSuccessResponse(res, 200, todo);
    }
  );

  public getUserTodos = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user.id;
      const todos: ITodoSchema[] = await this.todoService.getUserTodos(userId);
      sendSuccessResponse(res, 200, todos);
    }
  );

  public createTodo = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const userName = req.user.name;
    const todo: ITodoSchema = {
      ...req.body,
      userId,
      userName,
    };
    const newTodo: ITodoSchema = await this.todoService.createTodo(todo);
    sendSuccessResponse(res, 201, newTodo);
  });

  public updateTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedTodo: ITodoSchema | null = await this.todoService.updateTodo(
        req.params.id,
        req.body
      );

      if (!updatedTodo)
        return next(
          errorHandler(
            new AppError(ErrorType.TODO_NOT_FOUND, ErrorType.NOT_FOUND),
            req,
            res,
            next
          )
        );

      sendSuccessResponse(res, 200, updatedTodo);
    }
  );

  public deleteTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const deletedTodo: ITodoSchema | null = await this.todoService.deleteTodo(
        req.params.id
      );

      if (!deletedTodo)
        return next(
          errorHandler(
            new AppError(ErrorType.TODO_NOT_FOUND, ErrorType.NOT_FOUND),
            req,
            res,
            next
          )
        );

      sendSuccessResponse(res, 200, deletedTodo);
    }
  );
}
