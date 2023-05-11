import UserService from '../services/UserService.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import filterBody from '../utils/filterBody.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export default class UserController {
  static getAllUsers = catchAsync(async (req, res, next) => {
    const users = await UserService.getAllUsers();
    sendSuccessResponse(res, 200, users);
  });

  static getUser = catchAsync(async (req, res, next) => {
    const user = await UserService.getUser(req.params.id);

    if (!user) return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, user);
  });

  static createUser = catchAsync(async (req, res, next) => {
    const newUser = await UserService.createUser(req.body);
    sendSuccessResponse(res, 201, newUser);
  });

  static updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);

    if (!updatedUser)
      return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, updatedUser);
  });

  static updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This rout is not for password updates. Please use /updatePassword'
        )
      );
    }
    // Filtered out unwanted fields names that are not allowed to updated
    const filteredBody = filterBody(req.body, 'name', 'email');

    const updatedUser = await UserService.updateUser(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    sendSuccessResponse(res, 201, updatedUser);
  });

  static deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = await UserService.deleteUser(req.params.id);

    if (!deletedUser)
      return next(new AppError('No Document found with tat ID', 404));

    sendSuccessResponse(res, 200, deletedUser);
  });

  static deleteMe = catchAsync(async (req, res, next) => {
    await UserService.deleteUser(req.user.id, { active: false });

    sendSuccessResponse(res, 204, null);
  });
}
