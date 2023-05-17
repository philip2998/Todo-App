import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/exceptions/AppError.js';

export default class ErrorMiddleware {
  static errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    ErrorMiddleware.sendErrorForDev(err, req, res);
  }

  static sendErrorForDev(err: AppError, req: Request, res: Response): void {
    if (req.originalUrl.startsWith('/api')) {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
    }
  }
}
