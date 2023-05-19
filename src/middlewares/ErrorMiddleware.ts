import { Request, Response } from 'express';
import { OptionsForErrorMiddleware } from '../types/index.js';
import AppError from '../utils/exceptions/AppError.js';

const sendErrorForDev = (err: AppError, req: Request, res: Response): void => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const errorHandler: OptionsForErrorMiddleware = (
  err: AppError,
  req: Request,
  res: Response
): void => {
  err.statusCode = err.statusCode || 500;

  sendErrorForDev(err, req, res);
};

export default errorHandler;
