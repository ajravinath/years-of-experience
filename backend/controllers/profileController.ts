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
    ...JSON.parse(req.body.data),
    image: req?.file?.path,
  };

  const profile = await Profile.create(info, { returning: true });
  res.status(200).send(profile);
  console.log(profile);
};

const updateInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = JSON.parse(req.body.data);
  if (req?.file?.path) {
    data.image = req?.file?.path;
  }
  const result = await Profile.update(data, {
    where: { id: id },
    returning: true,
  });
  res.status(200).send(result[1][0]);
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
