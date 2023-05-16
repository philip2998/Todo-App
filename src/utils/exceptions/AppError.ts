export default class AppError extends Error {
  public status: string;
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number, status: string) {
    super(message);

    this.status = status;
    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
