import { Request, Response, NextFunction } from 'express';

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  data: object
) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

// export const filterBody = (object: object, ...allowedFields) => {
//   const newObject = {};
//   Object.keys(object).forEach(el => {
//     if (allowedFields.includes(el)) newObject[el] = object[el];
//   });
//   return newObject;
// };
