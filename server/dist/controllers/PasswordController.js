import { catchAsync } from '../utils/helpers.js';
import errorHandler from '../middlewares/errorMiddleware.js';
import UserService from '../services/UserService.js';
import createToken from '../utils/JwtToken.js';
import sendEmail from '../utils/email.js';
import AppError from '../utils/exceptions/AppError.js';
import crypto from 'crypto';
export default class PasswordController {
    userService;
    constructor() {
        this.userService = new UserService();
    }
    forgotPassword = catchAsync(async (req, res, next) => {
        const user = await this.userService.findOneUser({
            email: req.body.email,
        });
        if (!user)
            return next(errorHandler(new AppError("There is no user with email address", 404), req, res, next));
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
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
        }
        catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(errorHandler(new AppError("There was an error sending the email. try later!", 500), req, res, next));
        }
    });
    resetPassword = catchAsync(async (req, res, next) => {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');
        const user = await this.userService.findOneUser({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) {
            return next(errorHandler(new AppError("Token is invalid or has expired", 400), req, res, next));
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        createToken(user, 200, res);
    });
    updatePassword = catchAsync(async (req, res, next) => {
        const user = await this.userService.findUserById(req.user.id);
        if (!user) {
            return next(errorHandler(new AppError("No User found with that ID!", 401), req, res, next));
        }
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(errorHandler(new AppError("Your current password is wrong!", 401), req, res, next));
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();
        createToken(user, 200, res);
    });
}
//# sourceMappingURL=PasswordController.js.map