import { Router } from "express";
import userController from "../controllers/userController";
// import microCorsMiddleware from "../middleware/microCorsMiddleware";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", /* microCorsMiddleware, */ userController.login);
userRouter.post("/refresh", userController.refresh);

export default userRouter;
