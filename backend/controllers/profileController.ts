import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import models from "../models";

const Profile = models.profiles;

const getProfile = async (req: Request, res: Response) => {
  const id = req.params.id;
  const profile = await Profile.findOne({ where: { id: id } });
  res.status(200).send(profile);
};

const getInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const profile = await Profile.findOne({
    where: { id: id },
    attributes: { exclude: ["experience"] },
  });
  res.status(200).send(profile);
};

const createInfo = async (req: Request, res: Response) => {
  console.log("body", req.body);
  console.log("file: ", req.file);
  const info = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req?.file?.path,
    title: req.body.title,
    dob: req.body.dob,
  };

  const profile = await Profile.create(info);
  res.status(200).send(profile);
  console.log(profile);
};

const updateInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const profile = await Profile.update(req.body, { where: { id: id } });
  res.status(200).send(profile);
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

export default { getProfile, getInfo, createInfo, updateInfo, upload };
