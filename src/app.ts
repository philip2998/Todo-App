import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';

import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';

import AppError from './utils/exceptions/AppError.js';
import ErrorMiddleware from './middlewares/ErrorMiddleware.js';

interface CustomRequest extends Request {
  requestedTime?: string;
}

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.initalizeMiddlewares();
    this.initalizeRoutes();
    this.initalizeErrorHandling();
  }

  private initalizeMiddlewares(): void {
    this.app.use(express.static(path.resolve('public')));

    this.app.use(helmet());

    if (process.env.NODE_ENV === 'development') this.app.use(morgan('dev'));

    const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP. Please try again an hour!',
    });

    this.app.use('/users', limiter);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(mongoSanitize());
    this.app.use(xss());

    this.app.use((req: CustomRequest, res: Response, next: NextFunction) => {
      req.requestedTime = new Date().toISOString();
      next();
    });
  }

  private initalizeRoutes(): void {
    this.app.use('/api', routes);
  }

  private initalizeErrorHandling(): void {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError(
          `Can't find ${req.originalUrl} on this server`,
          404,
          'Fail'
        )
      );
    });

    this.app.use(ErrorMiddleware.errorHandler);
  }

  public getApp(): express.Application {
    return this.app;
  }
}
