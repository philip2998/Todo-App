import { Response } from 'express';
import IUserSchema from '../interfaces/modelInterfaces.js';
import jwt from 'jsonwebtoken';

export const createSendToken = (
  user: IUserSchema,
  statusCode: number,
  res: Response
): void => {
  const token: string = signJwtToken(user._id);
  const cookieOptions: { expires: Date; httpOnly: boolean; secure?: boolean } =
    {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = '';

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signJwtToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};
