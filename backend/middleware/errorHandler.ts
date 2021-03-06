import { NextFunction, Request, Response } from "express";
import {
  EmptyResultError,
  Error as SequalizeError,
  ValidationError,
} from "sequelize";

class ApiError {
  constructor(
    public name: string,
    public message: string,
    public status = 400,
    public additional = ""
  ) {}
}
const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log("Inside error handler");
  let apiError = new ApiError(error.name, error.message, 400);
  if (error instanceof SequalizeError) {
    console.log("sequalize error");
    if (error instanceof ValidationError) {
      apiError = new ApiError(
        error.name,
        error.message,
        400,
        "validation-error"
      );
    }
    if (error instanceof EmptyResultError) {
      apiError = new ApiError(
        error.name,
        error.message,
        400,
        "not-found-error"
      );
    }
  }
  console.log("error", error.message);
  response.status(apiError.status).send(apiError);
};

export default errorHandler;
