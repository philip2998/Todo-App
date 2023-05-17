import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userService.getAllUsers();
      sendSuccessResponse(res, 200, users);
    }
  );

  public getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.getUser(req.params.id);

      if (!user)
        return next(new AppError('No User found with that ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, user);
    }
  );

  public createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await this.userService.createUser(req.body);
      sendSuccessResponse(res, 201, newUser);
    }
  );

  public updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );

      if (!updatedUser)
        return next(new AppError('No User found with that ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, updatedUser);
    }
  );

  public deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const deletedUser = await this.userService.deleteUser(req.user.id, {
        active: false,
      });

      if (!deletedUser)
        return next(new AppError('No User found with tat ID', 404, 'Fail'));

      sendSuccessResponse(res, 200, deletedUser);
    }
  );
}
