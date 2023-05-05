import AppError from './AppError.js';

export default class JWTErrorsHandler {
  static handleJWTError() {
    return new AppError('Invalid token. Please log in again!', 401);
  }

  static handleJWTExpiredToken() {
    return new AppError('Your token has expired. Please log in again!', 401);
  }
}
