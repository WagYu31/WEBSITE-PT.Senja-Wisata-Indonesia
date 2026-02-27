import mysql from "mysql2/promise";

// Singleton connection pool — reused across requests in Next.js
const globalForDb = global as typeof global & { dbPool?: mysql.Pool };

function createPool(): mysql.Pool {
    // TiDB Cloud / Vercel: use DATABASE_URL
    if (process.env.DATABASE_URL) {
        const url = new URL(process.env.DATABASE_URL);
        return mysql.createPool({
            host: url.hostname,
            port: Number(url.port) || 4000,
            user: url.username,
            password: decodeURIComponent(url.password),
            database: url.pathname.slice(1),
            ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0,
            timezone: "+07:00",
        });
    }

    // Local development: use individual env vars
    return mysql.createPool({
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
}

export const db: mysql.Pool = globalForDb.dbPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
    globalForDb.dbPool = db;
}

