import UserService from '../services/UserService.js';
import AppError from '../errors/AppError.js';
import {
  catchAsync,
  filterBody,
  sendSuccessResponse,
} from '../utils/helpers.js';

export default class UserController {
  static getAllUsers = catchAsync(async (req, res, next) => {
    const users = await UserService.getAllUsers();
    sendSuccessResponse(res, 200, users);
  });

  static getUser = catchAsync(async (req, res, next) => {
    const user = await UserService.getUser(req.params.id);

    if (!user) return next(new AppError('No User found with that ID', 404));

    sendSuccessResponse(res, 200, user);
  });

  static createUser = catchAsync(async (req, res, next) => {
    const newUser = await UserService.createUser(req.body);
    sendSuccessResponse(res, 201, newUser);
  });

  static updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);

    if (!updatedUser)
      return next(new AppError('No User found with that ID', 404));

    sendSuccessResponse(res, 200, updatedUser);
  });

  static deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = await UserService.deleteUser(req.user.id, {
      active: false,
    });

    if (!deletedUser)
      return next(new AppError('No User found with tat ID', 404));

    sendSuccessResponse(res, 200, deletedUser);
  });
}
