require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Pool } = require("pg");

const config = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
};

const pool = new Pool(config);

pool.connect(() => {
  console.log("DB CONNECT");
});

export { pool };
