import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json({
    info: "Server running",
  });
});

app.listen(port, () => `Server running ${port}`);
