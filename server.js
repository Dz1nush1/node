import express from "express";
import applicantsRouter from "./controllers/ApplicantsController.js";
import employersRouter from "./controllers/EmployersController.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", applicantsRouter);
app.use("/", employersRouter);

app.get("/run-employer-faker", (req, res) => {
  exec("node EmployerFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("EmployerFaker.js запущен");
});
app.get("/run-applicant-faker", (req, res) => {
  exec("node ApplicantFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("ApplicantFaker.js запущен");
});

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});
