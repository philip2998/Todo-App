import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Catching Uncaught Exceptions
process.on('uncaughtException', err => {
  console.log('Uncaught Error!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}...`));

// Errors outside Express: Unhandled Rejection
process.on('unhandledRejection', err => {
  console.log('Unhandled Error!');
  console.log(err.name, err.message);
  process.exit(1);
});
