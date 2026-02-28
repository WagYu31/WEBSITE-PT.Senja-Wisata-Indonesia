import { NextResponse } from "next/server";

export async function GET() {
    const results: string[] = [];

    try {
        results.push("Step 1: Loading nodemailer...");
        const nodemailer = require("nodemailer");
        results.push("Step 2: Nodemailer loaded OK");

        const smtpUser = "adminsenja@fluentlya.com";
        const smtpPass = "SenjaWisata2026";

        results.push(`Step 3: Creating transport (user: ${smtpUser})`);
        const transporter = nodemailer.createTransport({
            host: "mail.fluentlya.com",
            port: 465,
            secure: true,
            auth: { user: smtpUser, pass: smtpPass },
        });

        results.push("Step 4: Verifying SMTP connection...");
        await transporter.verify();
        results.push("Step 5: SMTP connection OK!");

        results.push("Step 6: Sending test email...");
        const info = await transporter.sendMail({
            from: `"Senja Wisata" <${smtpUser}>`,
            to: "cingire687@gmail.com",
            subject: "Debug Test - Senja Wisata",
            text: "Email debug test berhasil!",
        });
        results.push(`Step 7: Email SENT! MessageId: ${info.messageId}`);

        return NextResponse.json({ success: true, results });
    } catch (err: unknown) {
        const error = err as Error;
        results.push(`ERROR: ${error.message}`);
        results.push(`Stack: ${error.stack?.split("\n").slice(0, 3).join(" | ")}`);
        return NextResponse.json({ success: false, results, error: error.message });
    }
}
