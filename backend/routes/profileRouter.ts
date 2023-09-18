import { Router } from "express";
import experienceRouter from "./experienceRouter";
import authenticate from "../middleware/authenticator";
import profileController from "../controllers/profileController";
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
