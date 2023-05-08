import AppError from '../utils/AppError.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import filterBody from '../utils/filterBody.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export default class UserController {
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

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    sendSuccessResponse(res, 201, updatedUser);
  });

  static deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    sendSuccessResponse(res, 204, null);
  });

  static createUser = catchAsync(async (req, res, next) => {
    res.status(500).json({
      status: 'error',
      message: 'This rout is not yet defined!',
    });
  });
}
