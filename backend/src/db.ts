import mysql from "mysql2/promise";

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  maxIdle: 10,
  idleTimeout: 3000,
  queueLimit: 0,
});

export default async function query(sql: string, params: any[]) {
  const [results] = await connectionPool.execute(sql, params);
  return results;
}
