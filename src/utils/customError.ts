export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message: string = "Validation Error") {
    super(message, 400);
  }
}
class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized Access") {
    super(message, 401);
  }
}

export const CustomError = {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
};
