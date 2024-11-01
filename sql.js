import mysql from "mysql2";

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "egorkuqv.beget.tech",
  user: "egorkuqv_curse",
  password: "Q1qqqqqq",
  database: "egorkuqv_curse",
});

export default pool;

pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query("SELECT * FROM teachers", (error, results, fields) => {
    connection.release();

    if (error) throw error;
  });
});
