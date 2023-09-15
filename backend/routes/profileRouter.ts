import { Router } from "express";
import profileController from "controllers/profileController";
import experienceRouter from "./experienceRouter";
import authenticate from "middleware/authenticator";

const profileRouter = Router();

profileRouter.use("/:id/experience", authenticate, experienceRouter);

profileRouter.get("/:id/all", authenticate, profileController.getProfile);
profileRouter.get("/:id", authenticate, profileController.getInfo);
profileRouter.post(
  "/",
  authenticate,
  profileController.upload,
  profileController.createInfo
);
profileRouter.put(
  "/:id",
  authenticate,
  profileController.upload,
  profileController.updateInfo
);

export default profileRouter;
