import express from "express";
import "dotenv/config";
import cors from "cors";
import profileRouter from "./routes/profileRouter";
import errorHandler from "./middleware/errorHandler";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";
import path from "path";
import { whitelist } from "./constants";

const app = express();

/** dynamic whitelisting can be extended */
app.use(
  cors({
    credentials: true,
    origin: whitelist,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT;

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);

app.use("/Images", express.static("./Images"));

app.use("/", express.static(path.join(__dirname, "client")));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
