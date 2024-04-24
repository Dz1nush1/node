import express from "express";
import multer from "multer";
import path from "path";
import Employer from "../models/Employers.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/employers");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/employers", (req, res) => {
  Employer.getAll((err, employers) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении работодателей:" });
      return;
    }
    employers.forEach((employer) => {
      let date = new Date(employer.Дата_Основания);
      employer.Дата_Основания = date.toISOString().substring(0, 10);
    });
    res.json(employers);
  });
});
router.get("/employers/:id", (req, res) => {
  Employer.getById(req.params.id, (err, employer) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении работодателя:" });
      return;
    }
    employer.forEach((employer) => {
      let date = new Date(employer.Дата_Основания);
      employer.Дата_Основания = date.toISOString().substring(0, 10);
    });
    res.json(employer);
  });
});
router.post("/employers", upload.single("photo"), (req, res) => {
  if (!req.file) {
    console.error("No file received");
    res.status(400).json({ error: "No file received" });
    return;
  }

  let employerData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Организация: req.body.organization,
    Дата_Основания: req.body.foundation_date,
    Вакансия: req.body.vacancy,
    Телефон: req.body.phone,
    Email: req.body.email,
    Фото: req.file.path.replace(/\\/g, "/"),
  };

  Employer.add(employerData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении работодателя:" });
      return;
    }
    res.json({ message: "Работодатель успешно добавлен" });
  });
});

router.delete("/employers/:id", (req, res) => {
  Employer.getById(req.params.id, (err, employer) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении работодателя:" });
      return;
    }

    Employer.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении работодателя:" });
        return;
      }
      res.json({ message: "Работодатель успешно удален" });
    });
  });
});
router.delete("/delete-all-employers", (req, res) => {
  Employer.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при удалении работодателей:" });
      return;
    }
    res.json({ message: "Все работодатели успешно удалены" });
  });
});

router.put("/employers/:id", upload.single("photo"), (req, res) => {
  let employerData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Организация: req.body.organization,
    Дата_Основания: req.body.foundation_date,
    Вакансия: req.body.vacancy,
    Телефон: req.body.phone,
    Email: req.body.email,
  };

  if (req.file) {
    employerData.Фото = req.file.path.replace(/\\/g, "/");
  }

  Employer.update(req.params.id, employerData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении работодателя:" });
      return;
    }
    res.json({ message: "Работодатель успешно обновлен" });
  });
});

export default router;
