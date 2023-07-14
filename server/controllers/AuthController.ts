import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/helpers.js';
import { ErrorType } from '../utils/enums/index.js';

import crypto from 'crypto';
import createToken from '../utils/JwtToken.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
import errorHandler from '../middlewares/errorMiddleware.js';
import sendEmail from '../utils/email.js';

export default class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, email, password, passwordConfirm, role } = req.body;

      // Check if the email already exists
      const existingUser = await this.userService.findOneUser({ email });
      if (existingUser) {
        return next(
          errorHandler(
            new AppError(ErrorType.EMAIL_ALREADY_EXISTS, ErrorType.BAD_REQUEST),
            req,
            res,
            next
          )
        );
      }

      if (passwordConfirm !== password) {
        return next(
          errorHandler(
            new AppError(ErrorType.NOT_SAME_PASSWORD, ErrorType.BAD_REQUEST),
            req,
            res,
            next
          )
        );
      }

      const newUser = await this.userService.createUser({
        name,
        email,
        password,
        passwordConfirm,
        role,
      });
      createToken(newUser, 201, res);
    }
  );

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password)
        return next(
          new AppError(ErrorType.NO_EMAIL_AND_PASSWORD, ErrorType.BAD_REQUEST)
        );

      const user = await this.userService.findOneUser({ email }, '+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
          errorHandler(
            new AppError(
              ErrorType.INCORRECT_EMAIL_OR_PASSWORD,
              ErrorType.UNAUTHORIZED
            ),
            req,
            res,
            next
          )
        );
      }
      createToken(user, 200, res);
    }
  );

  public forgotPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.findOneUser({
        email: req.body.email,
      });
      if (!user)
        return next(
          errorHandler(
            new AppError(ErrorType.USER_NOT_FOUND_EMAIL, ErrorType.NOT_FOUND),
            req,
            res,
            next
          )
        );

      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/resetPassword/${resetToken}`;

      const message = `Forgot your password? Submit a PATCH request with your 
      new password and passwordConfirm to: ${resetURL}.\n If you didn't forget 
      your password, please ignore this email!`;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Your password reset token (valid for 10 min)',
          message,
        });

        res.status(200).json({
          status: 'success',
          message: 'Token sent to email!',
        });
      } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
          errorHandler(
            new AppError(ErrorType.ERROR_WITH_EMAIL, ErrorType.SERVER_ERROR),
            req,
            res,
            next
          )
        );
      }
    }
  );

  public resetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

      const user = await this.userService.findOneUser({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return next(
          errorHandler(
            new AppError(
              ErrorType.INVALID_OR_EXPIRED_TOKEN,
              ErrorType.BAD_REQUEST
            ),
            req,
            res,
            next
          )
        );
      }
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      createToken(user, 200, res);
    }
  );

  /* public updatePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService
        .findUserById(req.user.id)
        .select('+password');

      if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
      ) {
        return next(
          errorHandler(
            new AppError(ErrorType.INCORRECT_PASSWORD, ErrorType.UNAUTHORIZED),
            req,
            res,
            next
          )
        );
      }

      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      await user.save();

      createToken(user, 200, res);
    }
  ); */

  public logout(req: Request, res: Response): void {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  }

  public checkPermissions(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!role.includes(req.user.role)) {
        return next(
          errorHandler(
            new AppError(ErrorType.UNAUTHORIZED_ACCESS, ErrorType.UNAUTHORIZED),
            req,
            res,
            next
          )
        );
      }
      next();
    };
  }
}
