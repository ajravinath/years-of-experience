import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", (request, response) => {
  response.json({
    info: "Years of experience Node.js, Express, postgres Server",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});