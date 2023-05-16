import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/exceptions/AppError.js';

export default class ErrorMiddleware {
  static errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    ErrorMiddleware.sendErrorForDev(err, req, res);
  }

  static sendErrorForDev(err: AppError, req: Request, res: Response) {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
    }
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
}
