import db from "../sql.js";

let Applicant = {};

Applicant.getAll = (callback) => {
  db.query("SELECT * FROM applicants", callback);
};

Applicant.add = (applicantData, callback) => {
  db.query("INSERT INTO applicants SET ?", applicantData, callback);
};
Applicant.update = (id, applicantData, callback) => {
  db.query(
    "UPDATE applicants SET ? WHERE id = ?",
    [applicantData, id],
    callback
  );
};
Applicant.delete = (id, callback) => {
  db.query("DELETE FROM applicants WHERE id = ?", id, callback);
};
Applicant.getById = (id, callback) => {
  db.query("SELECT * FROM applicants WHERE id = ?", id, callback);
};

Applicant.deleteAll = (callback) => {
  db.query("DELETE FROM applicants", callback);
};

export default Applicant;
