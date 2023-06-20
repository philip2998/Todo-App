export default class AppError extends Error {
    statusCode;
    message;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=AppError.js.map