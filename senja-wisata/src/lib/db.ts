import mysql from "mysql2/promise";

// Singleton connection pool — reused across requests in Next.js
const globalForDb = global as typeof global & { dbPool?: mysql.Pool };

export const db: mysql.Pool = globalForDb.dbPool ?? mysql.createPool({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "senja",
    password: process.env.DB_PASSWORD ?? "senja123",
    database: process.env.DB_NAME ?? "senja_wisata",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: "+07:00",
});

if (process.env.NODE_ENV !== "production") {
    globalForDb.dbPool = db;
}
