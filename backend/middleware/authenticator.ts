import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../models/apiErrorResponse";

const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accessToken = request.cookies["accessToken"] as string;
  let apiError = new ApiError(
    "unauthenticated",
    "You are not authenticated!",
    401
  );
  if (!accessToken) {
    apiError = new ApiError("unauthenticated", "No token provided", 401);
    return response.status(401).send(apiError);
  }
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    request.user = decoded.user;
    next();
  } catch (error) {
    apiError = new ApiError(
      (error as Error).name,
      (error as Error).message,
      400
    );
    response.status(apiError.status).json(apiError);
  }
};

export default authenticate;
