import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/helpers.js';
import { ErrorType } from '../utils/enums/index.js';

import errorHandler from '../middlewares/errorMiddleware.js';
import UserService from '../services/UserService.js';
import createToken from '../utils/JwtToken.js';
import sendEmail from '../utils/email.js';
import AppError from '../utils/exceptions/AppError.js';
import crypto from 'crypto';

export default class PasswordController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

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

  public updatePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.findUserById(req.user.id);

      if (!user) {
        return next(
          errorHandler(
            new AppError(ErrorType.USER_NOT_FOUND, ErrorType.UNAUTHORIZED),
            req,
            res,
            next
          )
        );
      }

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
  );
}
