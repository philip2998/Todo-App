import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';

const getAll = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.find();
    sendSuccessResponse(res, 200, document);
  });

const getOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = Model.findById(req.params.id);

    if (!document)
      return next(new AppError('No Document fount with that ID', 404));

    sendSuccessResponse(res, 200, document);
  });

const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);
    sendSuccessResponse(res, 201, document);
  });

const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document)
      return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, document);
  });

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = Model.findByIdAndDelete(req.params.id);

    if (!document)
      return next(new AppError('No Document found with that ID', 404));

    sendSuccessResponse(res, 200, document);
  });

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
