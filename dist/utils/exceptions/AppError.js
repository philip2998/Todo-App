export default class AppError extends Error {
    constructor(message, statusCode, status) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=AppError.js.map