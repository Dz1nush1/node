import db from "../sql.js";

let Employer = {};

Employer.getAll = (callback) => {
  db.query("SELECT * FROM teachers", callback);
};

Employer.add = (employerData, callback) => {
  db.query("INSERT INTO teachers SET ?", employerData, callback);
};
Employer.update = (id, employerData, callback) => {
  db.query("UPDATE teachers SET ? WHERE id = ?", [employerData, id], callback);
};
Employer.delete = (id, callback) => {
  db.query("DELETE FROM teachers WHERE id = ?", id, callback);
};
Employer.getById = (id, callback) => {
  db.query("SELECT * FROM teachers WHERE id = ?", id, callback);
};

Employer.deleteAll = (callback) => {
  db.query("DELETE FROM teachers ", callback);
};

export default Employer;
