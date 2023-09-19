import { Router } from "express";
import experienceRouter from "./experienceRouter";
import authenticate from "../middleware/authenticator";
import profileController from "../controllers/profileController";
const profileRouter = Router();

profileRouter.use("/:id/experience", experienceRouter);

profileRouter.get("/:id/all", profileController.getProfile);
profileRouter.get("/:id", profileController.getInfo);
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
