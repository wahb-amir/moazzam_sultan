import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_MS = 10_000;
const rateMap = new Map();

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
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Expected JSON" }, { status: 400 });
    }

    const body = await request.json();

    // Honeypot
    if (body.hp && body.hp.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const { name, email, phone, message } = body;

    // Validation
    if (!name || name.length < 2)
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    if (!email || !isValidEmail(email))
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    if (!message || message.length < 5)
      return NextResponse.json({ error: "Message too short" }, { status: 400 });

    // Rate Limiting
    const ip = (request.headers.get("x-forwarded-for") || "unknown")
      .split(",")[0]
      .trim();
    const now = Date.now();
    if (now - (rateMap.get(ip) || 0) < RATE_LIMIT_MS) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    rateMap.set(ip, now);

    const esc = (s) => escapeHtml(s);
    const dateStr =
      new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";

   
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 10px !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f7fa;padding:40px 20px;">
          <tr>
            <td align="center">
              <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color:#2563eb;padding:30px;text-align:center;">
                    <span style="background:rgba(255,255,255,0.2);padding:6px 12px;border-radius:20px;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">New Inquiry</span>
                    <h1 style="color:#ffffff;margin:15px 0 0;font-size:24px;font-weight:700;">Message from ${esc(name)}</h1>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding:40px 30px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom:24px;">
                          <p style="margin:0;color:#64748b;font-size:14px;font-weight:600;text-transform:uppercase;">Sender Details</p>
                          <p style="margin:8px 0 0;color:#1e293b;font-size:16px;">
                            <strong>Email:</strong> <a href="mailto:${esc(email)}" style="color:#2563eb;text-decoration:none;">${esc(email)}</a><br>
                            ${phone ? `<strong>Phone:</strong> ${esc(phone)}` : ""}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px;background-color:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
                          <p style="margin:0;color:#64748b;font-size:14px;font-weight:600;text-transform:uppercase;margin-bottom:10px;">Message</p>
                          <div style="color:#334155;font-size:16px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-top:32px;">
                          <a href="mailto:${esc(email)}" style="background-color:#2563eb;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;box-shadow:0 2px 4px rgba(37,99,235,0.2);">Reply to Message</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 30px;background-color:#f1f5f9;border-top:1px solid #e2e8f0;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.8;">
                      Sent on ${dateStr} from <strong>${esc(ip)}</strong><br>
                      Browser: ${esc(request.headers.get("user-agent")?.split(" ")[0] || "Unknown")}
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin-top:20px;font-size:12px;color:#94a3b8;text-align:center;">
                &copy; ${new Date().getFullYear()} Your Website Contact System
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"${esc(name)}" <${process.env.SMTP_USER}>`, 
      to: "op422010@gmail.com",
      replyTo: email,
      subject: `New Message: ${name}`,
      html,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}
