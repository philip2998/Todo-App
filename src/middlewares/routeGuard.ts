import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/helpers.js';
import { ErrorType } from '../utils/enums/index.js';
import { verifyJwtToken } from './verifyJwtToken.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

export const routeGuard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userService: UserService = new UserService();
    let token: string | undefined;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError(ErrorType.LOGIN_PROMPT, ErrorType.UNAUTHORIZED));
    }

    try {
      const decoded = await verifyJwtToken(token, process.env.JWT_SECRET!);
      const currentUser = await userService.findUserById(decoded.id);

      if (!currentUser) {
        return next(
          new AppError(ErrorType.TOKEN_USER_EXPIRY, ErrorType.UNAUTHORIZED)
        );
      }

      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    } catch (error) {
      return next(
        new AppError(ErrorType.INVALID_TOKEN, ErrorType.UNAUTHORIZED)
      );
    }
  }
);
