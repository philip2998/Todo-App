import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import createSendToken from './createSendToken.js';

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  createSendToken(newUser, 201, res);
});

export default signup;
