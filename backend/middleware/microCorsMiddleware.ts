/* eslint-disable @typescript-eslint/ban-ts-comment */
import microCors from "micro-cors";
import { whitelist } from "../constants";

const cors = microCors({ origin: whitelist[1], allowCredentials: true });

const microCorsMiddleware = (
  request: Request,
  response: Response,
  // @ts-ignore
  next: NextFunction
) => {
  if (request.method === "OPTIONS") {
    // @ts-ignore
    return response.status(200).send("ok");
  } else {
    next();
  }
};

// @ts-ignore
export default cors(microCorsMiddleware);
