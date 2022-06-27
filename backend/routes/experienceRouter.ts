import { Router } from "express";
import experienceController from "../controllers/experienceController";

const experienceRouter = Router({
  mergeParams: true,
});

experienceRouter.get("/", experienceController.getAllExperiences);
experienceRouter.post(
  "/",
  experienceController.upload,
  experienceController.createExperience
);
experienceRouter.put(
  "/:experienceId",
  experienceController.upload,
  experienceController.updateExperience
);

export default experienceRouter;
