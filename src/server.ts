import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Catching Uncaught Exceptions
process.on('uncaughtException', (err: Error) => {
  console.log('Uncaught Error!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

import App from './App.js';
const app = new App().getApp();

const password: string = process.env.DATABASE_PASSWORD || '';
const DB: string = process.env.DATABASE!.replace('<PASSWORD>', password);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'));

const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}...`));

// Errors outside Express: Unhandled Rejection
process.on('unhandledRejection', (err: Error) => {
  console.log('Unhandled Error!');
  console.log(err.name, err.message);
  process.exit(1);
});
