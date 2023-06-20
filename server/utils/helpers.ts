import { Request, Response, NextFunction } from 'express';

export const catchAsync = (fn: (...args: any[]) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  data: object
): void => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};
