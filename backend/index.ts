import express from "express";
import "dotenv/config";
import cors from "cors";
import profileRouter from "./routes/profileRouter";
import errorHandler from "./middleware/errorHandler";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";

const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://years-of-experience.netlify.app/",
];
app.use(cors({ credentials: true, origin: whitelist }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT;

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);

app.use("/Images", express.static("./Images"));

app.get("/", (request, response) => {
  response.json({
    info: "Years of experience Node.js, Express, postgres Server",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
