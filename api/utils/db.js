import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function dbConnection() {
    
    try {
        const [rows] = await db.query("SELECT NOW()");
        console.log(" Database connected successfully");
    } catch (err) {
        console.error(" Database connection failed:", err.message);
    }
    ;
}

