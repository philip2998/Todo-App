import express from 'express';
import morgan from 'morgan';

import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';

import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';

import AppError from './utils/AppError.js';
import ErrorsHandler from './errorsHandlers/ErrorsHandler.js';

const app = express();

// GLOBAL MIDDLEWARES
// In our global middlewares we set some important stuff
// Set security HTTP header, Development logging, set limit requests
// from same API, for body parser using express.json(), Data sanitization and
// Serving static file

app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again an hour',
});
app.use('/users', limiter);

app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(express.static('public'));

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/todo', todoRouter);

// Global Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(ErrorsHandler.errorHandler);

export default app;
