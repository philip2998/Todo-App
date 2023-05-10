import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import filterBody from '../utils/filterBody.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

const updateMe = Model =>
  catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This rout is not for password updates. Please use /updatePassword'
        )
      );
    }
    // Filtered out unwanted fields names that are not allowed to updated
    const filteredBody = filterBody(req.body, 'name', 'email');

    const updatedUser = await Model.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    sendSuccessResponse(res, 201, updatedUser);
  });

export default updateMe;
