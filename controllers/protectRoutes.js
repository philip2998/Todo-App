import { promisify } from 'util';
import { catchAsync } from '../utils/helpers.js';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import AppError from '../errors/AppError.js';

// In this protect function we need to get token, check if it's true
// making verification token, checking current user and Grant access to
// protected route
const protectRoutes = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(new AppError('You are not logged in. Please log in!', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await UserService.findUserById(decoded.id);

  if (!currentUser)
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

export default protectRoutes;
