import mysql2 from "mysql2/promise";

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT || 3306;

if (!dbPassword || !dbName) {
  console.error("FATAL: DB_NAME or DB_PASSWORD not set. Create backend/.env from backend/.env.example and set DB_NAME and DB_PASSWORD.");
  process.exit(1);
}

const pool = mysql2.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});

export default pool;