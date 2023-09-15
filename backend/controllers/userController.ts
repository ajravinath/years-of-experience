import bcrypt from "bcryptjs";
import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiSuccessResponse from "models/apiSuccessResponse";
import models from "models/sequalize";

const User = models.users;

const EXPIRES_IN = "1h";
const EXPIRES_IN_REFRESH = "1d";

const secret = process.env.JWT_SECRET as string;

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    throw Error("Access Denied. No refresh token provided.");
  }
  const { email, id } = req.body;
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const accessToken = jwt.sign({ user: decoded.user }, secret, {
      expiresIn: EXPIRES_IN,
    });
    const user = { email, id, token: accessToken };
    res.status(200).send(new ApiSuccessResponse(user));
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Missing email and/or password");
    }
    const currentUser = await User.findOne({ where: { email: email } });
    if (currentUser) {
      throw new Error("User already exists");
    }
    const encryptPassword = await bcrypt.hash(password, 12);
    const user = await User.create(
      { email, password: encryptPassword },
      { returning: true }
    );
    const jwtUser = { email: email, id: user.dataValues.id };
    const token = jwt.sign({ user: jwtUser }, secret, {
      expiresIn: EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ user: jwtUser }, secret, {
      expiresIn: EXPIRES_IN_REFRESH,
    });

    const newUser = { ...user.dataValues, token };
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .send(new ApiSuccessResponse(newUser));
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Missing email and/or password");
    }
    const currentUser = await User.findOne({ where: { email: email } });
    if (!currentUser) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      currentUser.dataValues.password
    );
    if (isPasswordMatch) {
      const jwtUser = { email: email, id: currentUser.dataValues.id };
      const token = jwt.sign(
        { user: jwtUser },
        process.env.JWT_SECRET as string,
        {
          expiresIn: EXPIRES_IN,
        }
      );
      const refreshToken = jwt.sign({ user: jwtUser }, secret, {
        expiresIn: EXPIRES_IN_REFRESH,
      });
      const user = { ...currentUser.dataValues, token };
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(200)
        .send(new ApiSuccessResponse(user));
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

export default { login, register, refresh };
