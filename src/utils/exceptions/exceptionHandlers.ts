export const catchingUncaughtExceptions: NodeJS.Process = process.on(
  'uncaughtException',
  (err: Error) => {
    console.log('Uncaught Error!');
    console.log(err.name, err.message);
    process.exit(1);
  }
);

// Errors outside Express
export const handleRejections: NodeJS.Process = process.on(
  'unhandledRejection',
  (err: Error) => {
    console.log('Unhandled Error!');
    console.log(err.name, err.message);
    process.exit(1);
  }
);
