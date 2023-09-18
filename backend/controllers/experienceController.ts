import { EmptyResultError } from "sequelize";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import models from "../models/sequalize";
import ApiSuccessResponse from "../models/apiSuccessResponse";

const Experience = models.experiences;
const Profile = models.profiles;

const getExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const experience = await Experience.findOne({
      where: { profile_id: id },
    });
    if (experience === null) {
      throw new EmptyResultError(`profile with ${id} not found`);
    }
    res.status(200).send(new ApiSuccessResponse(experience));
  } catch (error) {
    next(error);
  }
};
const getAllExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const profile = await Profile.findByPk(id);
    if (profile === null) {
      throw new EmptyResultError(`profile with ${id} not found`);
    }
    const experiences = await Experience.findAll({
      where: { profile_id: id },
      order: [["startDate", "DESC"]],
    });
    res.status(200).send(new ApiSuccessResponse(experiences));
  } catch (error) {
    next(error);
  }
};

const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const info = {
    ...JSON.parse(req.body.data),
    profile_id: id,
    image: req?.file?.path,
  };
  try {
    const experience = await Experience.create(info);
    res.status(200).send(new ApiSuccessResponse(experience));
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const experienceId = req.params.experienceId;
  const data = JSON.parse(req.body.data);
  if (req?.file?.path) {
    data.image = req?.file?.path;
  }
  try {
    const profile = await Experience.findByPk(experienceId);
    if (profile === null) {
      throw new EmptyResultError(`experience with ${experienceId} not found`);
    }
    const result = await Experience.update(data, {
      where: { id: experienceId },
      returning: true,
    });
    res.status(200).send(new ApiSuccessResponse(result[1][0]));
  } catch (error) {
    next(error);
  }
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
