export const catchingUncaughtExceptions = process.on('uncaughtException', (err) => {
    console.log('Uncaught Error!');
    console.log(err.name, err.message);
    process.exit(1);
});
export const handleRejections = process.on('unhandledRejection', (err) => {
    console.log('Unhandled Error!');
    console.log(err.name, err.message);
    process.exit(1);
});
//# sourceMappingURL=exceptionHandlers.js.map