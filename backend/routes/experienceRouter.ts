import { Router } from "express";
import experienceController from "controllers/experienceController";
import authenticate from "middleware/authenticator";

const experienceRouter = Router({
  mergeParams: true,
});

experienceRouter.get("/", authenticate, experienceController.getAllExperiences);
experienceRouter.post(
  "/",
  authenticate,
  experienceController.upload,
  experienceController.createExperience
);
experienceRouter.put(
  "/:experienceId",
  authenticate,
  experienceController.upload,
  experienceController.updateExperience
);

export default experienceRouter;
