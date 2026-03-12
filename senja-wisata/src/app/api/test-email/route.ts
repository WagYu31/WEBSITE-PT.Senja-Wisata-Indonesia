import { NextResponse } from "next/server";
import { createTransporter, SMTP_FROM } from "@/lib/email";

export async function GET() {
    const results: string[] = [];

    try {
        results.push("Step 1: Creating transport from env vars...");
        const transporter = createTransporter();
        results.push("Step 2: Transport created OK");

        results.push("Step 3: Verifying SMTP connection...");
        await transporter.verify();
        results.push("Step 4: SMTP connection OK!");

        results.push("Step 5: Sending test email...");
        const info = await transporter.sendMail({
            from: SMTP_FROM,
            to: "cingire687@gmail.com",
            subject: "Debug Test - Senja Wisata",
            text: "Email debug test berhasil!",
        });
        results.push(`Step 6: Email SENT! MessageId: ${info.messageId}`);

        return NextResponse.json({ success: true, results });
    } catch (err: unknown) {
        const error = err as Error;
        results.push(`ERROR: ${error.message}`);
        results.push(`Stack: ${error.stack?.split("\n").slice(0, 3).join(" | ")}`);
        return NextResponse.json({ success: false, results, error: error.message });
    }
}
