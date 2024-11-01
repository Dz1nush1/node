import express from "express";
import employersRouter from "./controllers/EmployersController.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", employersRouter);


const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});
