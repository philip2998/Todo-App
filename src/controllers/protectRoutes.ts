import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/helpers.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

// In this protect class we need to get token, check if it's true
// making verification token, checking current user and Grant access to
// protected route
export default class ProtectRoutes {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public routeGuard = catchAsync(
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
        const decoded = await this.verifyToken(token, process.env.JWT_SECRET!);
        const currentUser = await this.userService.findUserById(decoded.id);

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

  private verifyToken(token: string, secret: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as JwtPayload);
        }
      });
    });
  }
}
