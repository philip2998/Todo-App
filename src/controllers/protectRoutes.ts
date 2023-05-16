import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import { catchAsync } from '../utils/helpers.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};

// In this protect function we need to get token, check if it's true
// making verification token, checking current user and Grant access to
// protected route
const protectRoutes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
      return next(
        new AppError('You are not logged in. Please log in!', 401, 'Fail')
      );
    }

    try {
      const decoded = await verifyToken(token, process.env.JWT_SECRET!);
      const currentUser = await UserService.findUserById(decoded.id);

      if (!currentUser) {
        return next(
          new AppError(
            'The user belonging to this token does no longer exist',
            401,
            'Fail'
          )
        );
      }

      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    } catch (error) {
      return next(new AppError('Invalid token', 401, 'Fail'));
    }
  }
);

export default protectRoutes;
