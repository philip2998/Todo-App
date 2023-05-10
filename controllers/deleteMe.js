import catchAsync from '../utils/catchAsync.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

export const deleteMe = Model =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.user.id, { active: false });

    sendSuccessResponse(res, 204, null);
  });
