import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "mail.fluentlya.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER || "adminsenja@fluentlya.com";
const SMTP_PASS = process.env.SMTP_PASS || "";

export const SMTP_FROM = `"Senja Wisata Indonesia" <${SMTP_USER}>`;

export function createTransporter() {
    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        tls: { rejectUnauthorized: false },
    });
}
