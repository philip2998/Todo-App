const sendErrorForDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
};
const errorHandler = (err, req, res) => {
    err.statusCode = err.statusCode || 500;
    sendErrorForDev(err, req, res);
};
export default errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map