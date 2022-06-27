import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import models from "../models";

const Experience = models.experiences;

const getExperience = async (req: Request, res: Response) => {
  const id = req.params.id;
  const experience = await Experience.findOne({
    where: { profile_id: id },
  });
  res.status(200).send(experience);
};
const getAllExperiences = async (req: Request, res: Response) => {
  const id = req.params.id;
  const experiences = await Experience.findAll({
    where: { profile_id: id },
  });
  res.status(200).send(experiences);
};

const createExperience = async (req: Request, res: Response) => {
  const info = {
    title: req.body.title,
    company: req.body.company,
    currentlyWorking: req.body.currentlyWorking === "true",
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    image: req?.file?.path,
    description: req.body.description,
  };

  const experience = await Experience.create(info);
  res.status(200).send(experience);
  console.log(experience);
};

const updateExperience = async (req: Request, res: Response) => {
  const experienceId = req.params.experienceId;
  const experience = await Experience.update(req.body, {
    where: { id: experienceId },
  });
  res.status(200).send(experience);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error("Unable to upload file"));
  },
}).single("image");

export default {
  getExperience,
  getAllExperiences,
  createExperience,
  updateExperience,
  upload,
};
