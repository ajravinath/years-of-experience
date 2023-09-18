import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.refresh);

export default userRouter;
