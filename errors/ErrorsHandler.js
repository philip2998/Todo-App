import DBErrorsHandler from './DBErrorsHandler.js';
import JWTErrorsHandler from './JWTErrorsHandler.js';

export default class ErrorsHandler {
  static errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    if (process.env.NODE_ENV === 'development') {
      ErrorsHandler.sendErrorForDev(err, req, res);
      next();
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err }; // Deep copy
      error.message = err.message;

      // Hanlding specific types of errors form production environment
      switch (error.name) {
        case 'CastError':
          error = DBErrorsHandler.handleCastErrorDB(error);
          break;
        case 'ValidationError':
          error = DBErrorsHandler.handleValidationErrorDB(error);
          break;
        case 'JsonWebTokenError':
          error = JWTErrorsHandler.handleJWTError();
          break;
        case 'TokenExpiredError':
          error = JWTErrorsHandler.handleJWTExpiredToken();
          break;
        default:
          if (error.code === 11000) {
            error = DBErrorsHandler.handleDuplicateFieldsDB(error);
          }
          break;
      }
      ErrorsHandler.sendErrorForProd(error, req, res);
    }
  }

  static sendErrorForDev(err, req, res) {
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
  // First we need to know if it is operational(trusted) error
  // and if so we send to client message, otherwise
  // programming or other unknown error
  static sendErrorForProd(err, req, res) {
    if (req.originalUrl.startsWith('/api')) {
      if (err.isOperational) {
        return res.status(err.statusCode).json({
          status: err.status,
          msg: err.message,
        });
      }
      console.error('ERROR', err);
      return res.status(500).json({
        status: 'error',
        msg: 'Something went wrong!',
      });
    }
    if (err.isOperational) {
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message,
      });
    }
    console.error('ERROR', err);

    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: 'Please try again later.',
    });
  }
}
