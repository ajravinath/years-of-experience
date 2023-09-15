import { Router } from "express";
import userController from "controllers/userController";

const userRouter = Router();

userRouter.use("/register", userController.register);
userRouter.get("/login", userController.login);
userRouter.get("/refresh", userController.refresh);

export default userRouter;
