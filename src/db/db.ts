require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
import { createPool } from "mysql2/promise";

// create the connection to database
const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT ? Number(DB_PORT) : 3307,
  database: DB_NAME,
});

export { pool };
