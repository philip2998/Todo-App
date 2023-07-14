import { catchAsync } from '../utils/helpers.js';
import crypto from 'crypto';
import createToken from '../utils/JwtToken.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
import errorHandler from '../middlewares/errorMiddleware.js';
import sendEmail from '../utils/email.js';
export default class AuthController {
    userService;
    constructor() {
        this.userService = new UserService();
    }
    signup = catchAsync(async (req, res, next) => {
        const { name, email, password, passwordConfirm, role } = req.body;
        const existingUser = await this.userService.findOneUser({ email });
        if (existingUser) {
            return next(errorHandler(new AppError("This Email is already exists, please provide another email!", 400), req, res, next));
        }
        if (passwordConfirm !== password) {
            return next(errorHandler(new AppError("Passwords are not the same!", 400), req, res, next));
        }
        const newUser = await this.userService.createUser({
            name,
            email,
            password,
            passwordConfirm,
            role,
        });
        createToken(newUser, 201, res);
    });
    login = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new AppError("Please provide email and password!", 400));
        const user = await this.userService.findOneUser({ email }, '+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(errorHandler(new AppError("Incorrect email or password!", 401), req, res, next));
        }
        createToken(user, 200, res);
    });
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
    logout(req, res) {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.status(200).json({ status: 'success' });
    }
    checkPermissions(role) {
        return (req, res, next) => {
            if (!role.includes(req.user.role)) {
                return next(errorHandler(new AppError("You do not have permisson to perform this action!", 401), req, res, next));
            }
            next();
        };
    }
}
//# sourceMappingURL=AuthController.js.map