import { NextFunction, Request, Response } from "express";
import {
  EmptyResultError,
  Error as SequalizeError,
  ValidationError,
} from "sequelize";
import { ApiError } from "../models/apiErrorResponse";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let apiError = new ApiError(error.name, error.message, 400, error.message);
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
        404,
        "not-found-error"
      );
    }
  }
  console.log("error", error.message);
  response.status(apiError.status).send(apiError);
};

export default errorHandler;
