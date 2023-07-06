import { Request, Response, NextFunction } from 'express';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import { ErrorType } from '../utils/enums/index.js';
import { IUserSchema } from '../interfaces/modelInterfaces.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users: IUserSchema[] = await this.userService.getAllUsers();
    const pureUsers = users.filter(user => user.role !== 'admin');
    sendSuccessResponse(res, 200, pureUsers);
  });

  public getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: IUserSchema | null = await this.userService.getUser(
        req.params.id
      );

      if (!user)
        return next(
          new AppError(ErrorType.USER_NOT_FOUND, ErrorType.NOT_FOUND)
        );

      sendSuccessResponse(res, 200, user);
    }
  );

  public createUser = catchAsync(async (req: Request, res: Response) => {
    const newUser: IUserSchema = await this.userService.createUser(req.body);
    sendSuccessResponse(res, 201, newUser);
  });

  public updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedUser: IUserSchema | null = await this.userService.updateUser(
        req.params.id,
        req.body
      );

      if (!updatedUser)
        return next(
          new AppError(ErrorType.USER_NOT_FOUND, ErrorType.NOT_FOUND)
        );

      sendSuccessResponse(res, 200, updatedUser);
    }
  );

  public deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      let deletedUser: IUserSchema | null = null;

      if (req.user.role === 'admin') {
        deletedUser = await this.userService.deleteUser(id, { active: false });
      } else {
        deletedUser = await this.userService.deleteUser(req.user.id, {
          active: false,
        });
      }

      if (!deletedUser)
        return next(
          new AppError(ErrorType.USER_NOT_FOUND, ErrorType.NOT_FOUND)
        );

      sendSuccessResponse(res, 200, deletedUser);
    }
  );
}
