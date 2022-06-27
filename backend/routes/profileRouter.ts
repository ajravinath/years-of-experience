import { Router } from "express";
import profileController from "../controllers/profileController";
import experienceRouter from "./experienceRouter";

const profileRouter = Router();

profileRouter.use("/:id/experience", experienceRouter);

profileRouter.get("/:id/all", profileController.getProfile);
profileRouter.get("/:id", profileController.getInfo);
profileRouter.post("/", profileController.upload, profileController.createInfo);
profileRouter.put(
  "/:id",
  profileController.upload,
  profileController.updateInfo
);

export default profileRouter;
