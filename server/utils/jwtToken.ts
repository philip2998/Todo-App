import { CookieOptions, Response } from 'express';
import { OptionsForCookie } from '../types/index.js';
import { IUserSchema } from '../interfaces/modelInterfaces.js';
import jwt from 'jsonwebtoken';

const signJwtToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (
  statusCode: number,
  user: IUserSchema,
  res: Response,
  token: string,
  options: CookieOptions
): void => {
  res.cookie('jwt', token, options);
  // Remove password from output;
  user.password = '';

  res.status(statusCode).json({
    status: 'Success',
    token,
    data: { user },
  });
};

const createToken = (
  user: IUserSchema,
  statusCode: number,
  res: Response
): void => {
  const token: string = signJwtToken(user._id);
  const cookieOptions: OptionsForCookie = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  sendToken(statusCode, user, res, token, cookieOptions);
};

export default createToken;
