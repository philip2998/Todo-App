import express from 'express';
import morgan from 'morgan';
import path from 'path';

import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';
import viewRouter from './routes/viewRoutes.js';

import AppError from './errors/AppError.js';
import ErrorsHandler from './errors/ErrorsHandler.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('views'));

// GLOBAL MIDDLEWARES
// In our global middlewares we set some important stuff
// Set security HTTP header, Development logging, set limit requests
// from same API, for body parser using express.json(), Data sanitization and
// Serving static file
app.use(express.static(path.resolve('public')));

app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again an hour',
});
app.use('/users', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// ROUTE
app.use('/', viewRouter);
app.use('/api', routes);

// Global Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(ErrorsHandler.errorHandler);

export default app;
