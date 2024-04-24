import express from "express";
import multer from "multer";
import path from "path";
import Applicant from "../models/Applicants.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/applicants");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/applicants", (req, res) => {
  Applicant.getAll((err, applicants) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении заявителей:" });
      return;
    }
    applicants.forEach((applicant) => {
      let date = new Date(applicant.Дата_Рождения);
      applicant.Дата_Рождения = date.toISOString().substring(0, 10);
    });
    res.json(applicants);
  });
});
router.get("/applicants/:id", (req, res) => {
  Applicant.getById(req.params.id, (err, applicant) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении заявителя:" });
      return;
    }
    applicant.forEach((applicant) => {
      let date = new Date(applicant.Дата_Рождения);
      applicant.Дата_Рождения = date.toISOString().substring(0, 10);
    });
    res.json(applicant);
  });
});
router.post("/applicants", upload.single("photo"), (req, res) => {
  let applicantData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Образование: req.body.education,
    Специальность: req.body.specialty,
    Дата_Рождения: req.body.birth_date,
    Телефон: req.body.phone,
    Email: req.body.email,
    Фото: req.file.path.replace(/\\/g, "/"),
  };

  Applicant.add(applicantData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении заявителя:" });
      return;
    }
    res.json({ message: "Заявитель успешно добавлен" });
  });
});

router.delete("/applicants/:id", (req, res) => {
  Applicant.getById(req.params.id, (err, applicant) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении заявителя:" });
      return;
    }

    Applicant.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении заявителя:" });
        return;
      }
      res.json({ message: "Заявитель успешно удален" });
    });
  });
});
router.delete("/delete-all-applicants", (req, res) => {
  Applicant.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при удалении соискателей:" });
      return;
    }
    res.json({ message: "Все соискатели успешно удалены" });
  });
});
router.put("/applicants/:id", upload.single("photo"), (req, res) => {
  let applicantData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Образование: req.body.education,
    Специальность: req.body.specialty,
    Дата_Рождения: req.body.birth_date,
    Телефон: req.body.phone,
    Email: req.body.email,
  };

  if (req.file) {
    applicantData.Фото = req.file.path.replace(/\\/g, "/");
  }

  Applicant.update(req.params.id, applicantData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении заявителя:" });
      return;
    }
    res.json({ message: "Заявитель успешно обновлен" });
  });
});

export default router;
