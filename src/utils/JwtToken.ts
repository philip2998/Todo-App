import { Response } from 'express';
import { OptionsForCookie } from '../types/index.js';
import IUserSchema from '../interfaces/modelInterfaces.js';
import jwt from 'jsonwebtoken';

export default class JwtToken {
  public createSendStoken(
    user: IUserSchema,
    statusCode: number,
    res: Response
  ): void {
    const token: string = this.signJwtToken(user._id);
    const cookieOptions: OptionsForCookie = {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);
    // Remove password from outpu
    user.password = '';

    res.status(statusCode).json({
      status: 'success',
      token,
      data: { user },
    });
  }

  private signJwtToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });
  }
}
