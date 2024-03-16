class apiError extends Error {
  statusCode: number;
  // Initializing default value in typescript
  message: string = "Something went wrong";
  errors?: any[];
  stack?: string | undefined;
  success: boolean = false;
  data: any = null;

  constructor(
    statusCode: number,
    message: string,
    errors?: [],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { apiError };
