export default class AppError extends Error {
  public status;
  public operational;

  constructor(message: string, statusCode: number) {
    super(message);

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.operational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
