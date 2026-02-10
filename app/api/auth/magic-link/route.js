import crypto from "crypto";
import User from "../../../modal/user";
import connectToDb from "../../../lib/mongo";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDb();

    const user = await User.findOne({ email });
    if (!user) {
     
      return NextResponse.json({ message: "If that account exists, an email has been sent." });
    }

    // 2. Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await User.findOneAndUpdate(
      { email },
      { magicToken: token, magicTokenExpires: expires }
    );

    // 3. Construct the verification link
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // 4. Send the Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio CMS" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Login Link",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #1e293b; text-align: center;">Instant Login</h2>
          <p style="color: #475569; font-size: 16px; text-align: center;">
            Click the button below to sign in to your Portfolio Dashboard. This link expires in 15 minutes.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Sign In to Dashboard
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Check your email" });
  } catch (error) {
    console.error("Magic Link Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}