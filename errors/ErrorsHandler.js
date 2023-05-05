import DBErrorsHandler from './DBErrorsHandler.js';
import JWTErrorsHandler from './JWTErrorsHandler.js';

export default class ErrorsHandler {
  static errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    if (process.env.NODE_ENV === 'development') {
      ErrorsHandler.sendErrorForDev(err, res);
      next();
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err }; // Deep copy

      // Hanlding specific types of errors form production environment
      if (error.name === 'CastError')
        error = DBErrorsHandler.handleCastErrorDB(error);
      if (error.code === 11000)
        error = DBErrorsHandler.handleDuplicateFieldsDB(error);
      if (error.name === 'ValidationError')
        error = DBErrorsHandler.handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError')
        error = JWTErrorsHandler.handleJWTError();
      if (error.anme === 'TokenExpiredError')
        error = JWTErrorsHandler.handleJWTExpiredToken();
      ErrorsHandler.sendErrorForProd(error, res);
    }
  }

  static sendErrorForDev(err, res) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  static sendErrorForProd(err, res) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error('ERROR', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  }
}
