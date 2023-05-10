import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  sendSuccessResponse(res, 204, null);
});
