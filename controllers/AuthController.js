import { promisify } from 'util';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import AppError from '../errors/AppError.js';
import JWTTokenController from './JWTTokenController.js';
import jwt from 'jsonwebtoken';

export default class AuthController {
  static signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    JWTTokenController.createSendToken(newUser, 201, res);
  });

  // For login we have to check some validation about
  // email and password, and if it is ok we send token
  // to the client
  static login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please provide email and password', 401));

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    JWTTokenController.createSendToken(user, 200, res);
  });

  static protect = catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return next(new AppError('You are not logged in. Please log in!', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError(
          'The user belonging to this token does no longer exist',
          401
        )
      );
    req.user = currentUser;
    next();
  });

  static restrictTo(role) {
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
