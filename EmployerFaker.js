import Employer from "./models/Employers.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const names = [
  "Иван",
  "Анастасия",
  "Алексей",
  "Мария",
  "Петр",
  "Екатерина",
  "Дмитрий",
  "София",
  "Андрей",
  "Юлия",
  "Сергей",
  "Елена",
  "Михаил",
  "Татьяна",
  "Максим",
];
const surnames = [
  "Иванов",
  "Смирнов",
  "Кузнецов",
  "Попов",
  "Васильев",
  "Петров",
  "Соколов",
  "Михайлов",
  "Новиков",
  "Федоров",
  "Морозов",
  "Волков",
  "Алексеев",
  "Лебедев",
  "Семенов",
];
const patronymics = [
  "Иванович",
  "Сергеевич",
  "Алексеевич",
  "Мариич",
  "Петрович",
  "Семёнович",
  "Николаевич",
  "Дмитриевич",
  "Андреевич",
  "Юрьевич",
  "Станиславович",
  "Валерьевич",
  "Викторович",
  "Евгеньевич",
  "Олегович",
];
const organizations = [
  "ООО-Технопарк",
  "ЗАО-Инжиниринговый центр",
  "АО-Технолоджи",
  "ИП-Иванов И.И.",
  "ООО-Синергия",
  "АО-Технопромэксперт",
  "ЗАО-Инжиниринговая компания",
  "ООО-Техносервис",
  "ИП-Петров П.П.",
  "ООО-Технокомпозит",
  "АО-Техноинвест",
  "ЗАО-Инжиниринговая группа",
  "ООО-Техносистемы",
  "ИП-Сидоров С.С.",
  "ООО-Техноснабжение",
  "АО-Технострой",
  "ЗАО-Инжиниринговый центр",
  "ООО-Технопроект",
  "ИП-Кузнецов К.К.",
  "ООО-Техносервис-плюс",
];
const vacancies = [
  "Специалист по продажам",
  "Инженер-конструктор",
  "Менеджер по работе с клиентами",
  "Бухгалтер",
  "Специалист по маркетингу",
  "Технический специалист",
  "Программист",
  "Администратор",
  "Графический дизайнер",
  "Оператор станков с ЧПУ",
  "Электрик",
  "Сварщик",
  "Фронтенд-разработчик",
  "Бэкенд-разработчик",
  "Тестировщик ПО",
  "Аналитик данных",
  "Менеджер по развитию бизнеса",
  "Специалист по кадрам",
  "Директор по продажам",
  "Главный бухгалтер",
];
const phones = [
  "+7 (901) 123-45-67",
  "+7 (902) 234-56-78",
  "+7 (903) 345-67-89",
  "+7 (904) 456-78-90",
  "+7 (905) 567-89-01",
  "+7 (906) 678-90-12",
  "+7 (907) 789-01-23",
  "+7 (908) 890-12-34",
  "+7 (909) 901-23-45",
  "+7 (910) 012-34-56",
  "+7 (911) 12-34-56",
  "+7 (912) 23-45-67",
  "+7 (913) 34-56-78",
  "+7 (914) 45-67-89",
  "+7 (915) 56-78-90",
];
const emails = [
  "john.doe@gmail.com",
  "jane_doe@yahoo.com",
  "johnson@outlook.com",
  "brown@hotmail.co.uk",
  "jones@web.de",
  "smith@me.com",
  "williams@aol.com",
  "thomas@mail.ru",
  "jones@gmx.com",
  "miller@yandex.ru",
  "davis@live.com",
  "thomas@zoho.com",
  "jones@fastmail.fm",
  "miller@inbox.lv",
  "thomas@tutanota.com",
  "jones@protonmail.com",
  "miller@gmx.net",
  "thomas@mail.com",
  "jones@yahoo.fr",
  "miller@naver.com",
];

function getRandomImagePath() {
  const fakerFolder = path.join(__dirname, "public", "img", "faker");
  const imageFiles = fs.readdirSync(fakerFolder);
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const relativePath = path.join("public", "img", "faker", randomImage);
  return relativePath.replace(/\\/g, "/");
}

function getRandomDate() {
  const start = new Date(1950, 0, 1);
  const end = new Date(2023, 11, 31);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return `${randomDate.getFullYear()}-${String(
    randomDate.getMonth() + 1
  ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`;
}

for (let i = 0; i < 100; i++) {
  let employerData = {
    Фамилия: surnames[Math.floor(Math.random() * surnames.length)],
    Имя: names[Math.floor(Math.random() * names.length)],
    Отчество: patronymics[Math.floor(Math.random() * patronymics.length)],
    Организация:
      organizations[Math.floor(Math.random() * organizations.length)],
    Дата_Основания: getRandomDate(),
    Вакансия: vacancies[Math.floor(Math.random() * vacancies.length)],
    Телефон: phones[Math.floor(Math.random() * phones.length)],
    Email: emails[Math.floor(Math.random() * emails.length)],
    Фото: getRandomImagePath(),
  };
  Employer.add(employerData, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
