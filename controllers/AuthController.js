import UserService from '../services/UserService.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import createSendToken from '../utils/createSendToken.js';

export default class AuthController {
  static signup = catchAsync(async (req, res, next) => {
    const newUser = await UserService.createUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    createSendToken(newUser, 201, res);
  });

  static login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please provide email and password', 401));

    const user = await UserService.findOneUser({ email }, '+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
    createSendToken(user, 200, res);
  });

  static logout(req, res) {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  }

  static checkPermissions(role) {
    return (req, res, next) => {
      if (!role.includes(req.user.role)) {
        return next(
          new AppError('You do not have permisson to perform this action', 403)
        );
      }
      next();
    };
  }
}
