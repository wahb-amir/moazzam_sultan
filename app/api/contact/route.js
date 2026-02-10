import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDb from "../../lib/mongo";
import Contact from "../../modal/contact";

const RATE_LIMIT_MS = 15_000;
const MAX_RETRIES = 2; // Total 3 attempts
const rateMap = new Map();

// --- HELPERS ---

async function withRetry(fn, retries = MAX_RETRIES, delay = 500) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2); // Exponential backoff
  }
}

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export async function POST(request) {
  try {
    const body = await request.json();

    if (body.hp) return NextResponse.json({ ok: true }, { status: 200 });

    const { name, email, phone, message } = body;
    if (!name || !isValidEmail(email) || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 2. Rate Limiting
    const ip = (request.headers.get("x-forwarded-for") || "unknown")
      .split(",")[0]
      .trim();
    const now = Date.now();
    if (now - (rateMap.get(ip) || 0) < RATE_LIMIT_MS) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    rateMap.set(ip, now);

    // 3. Setup Tasks
    await connectToDb();
    const esc = (s) => escapeHtml(s);
    const dateStr =
      new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";

    // TASK A: Save to MongoDB
    const saveToDbTask = () =>
      Contact.create({
        name,
        email,
        phone,
        message,
        ip,
        userAgent: request.headers.get("user-agent"),
      });

    // TASK B: Send Email
    const sendEmailTask = () => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE !== "false",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      return transporter.sendMail({
        from: `"${esc(name)}" <${process.env.SMTP_USER}>`,
        to: "op422010@gmail.com",
        replyTo: email,
        subject: `New Message: ${name}`,
        html: generateTemplate({
          name,
          email,
          phone,
          message,
          dateStr,
          ip,
          ua: request.headers.get("user-agent"),
        }),
        text: `New message from ${name} (${email}): ${message}`,
      });
    };

    await Promise.all([withRetry(saveToDbTask), withRetry(sendEmailTask)]);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Critical Contact Form Error:", err);
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }
}

// --- HTML TEMPLATE GENERATOR ---
function generateTemplate({ name, email, phone, message, dateStr, ip, ua }) {
  const esc = (s) => escapeHtml(s);
  return `
    <div style="font-family: sans-serif; background-color: #f4f7fa; padding: 40px; color: #334155;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
        <div style="background: #2563eb; padding: 20px; text-align: center; color: #fff;">
          <h2 style="margin: 0;">New Inquiry Received</h2>
        </div>
        <div style="padding: 30px;">
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase;">Message</p>
            <p style="margin: 10px 0 0; line-height: 1.6;">${esc(message)}</p>
          </div>
          <div style="margin-top: 30px; text-align: center;">
             <a href="mailto:${esc(email)}" style="background: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Direct Reply</a>
          </div>
        </div>
        <div style="background: #f1f5f9; padding: 15px; font-size: 11px; color: #94a3b8; text-align: center;">
          Sent on ${dateStr} from ${ip}<br>UA: ${esc(ua?.split(" ")[0] || "Unknown")}
        </div>
      </div>
    </div>
  `;
}
