import { Request, Response } from "express";

const errorHandler = (error: Error, request: Request, response: Response) => {
  const status = 400;
  response.status(status).send(error);
};

export default errorHandler;
