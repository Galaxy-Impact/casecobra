import { NextFunction, Request, Response } from "express";

const sendErrorDev = (error: any, _req: Request, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error: any, _req: Request, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });

    return;
  }

  res.status(error.statusCode).json({
    status: "error",
    message: "Something went wrong!",
  });
};

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
    return;
  }

  sendErrorDev(err, req, res);
};

export default globalErrorHandler;
