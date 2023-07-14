import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/exceptions/AppError';

export type OptionsForCookie = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};

export type OptionsForErrorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type OptionsForNodemailer = {
  email: string;
  subject: string;
  message: string;
};
