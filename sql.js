import mysql from "mysql2";

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "doctorax.beget.tech",
  user: "doctorax_node",
  password: "Q1qqqqqq",
  database: "doctorax_node",
});

export default pool;

pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query("SELECT * FROM applicants", (error, results, fields) => {
    connection.release();

    if (error) throw error;
  });
});
