import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDb from "../../lib/mongo";
import Contact from "../../modal/contact";
import { verifyAccessToken, rotateTokens } from "../../lib/auth";
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
        to: "sultanmoazzam3@gmail.com",
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
async function getAuthSession(req) {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (accessToken) {
    const decoded = verifyAccessToken(accessToken);
    if (decoded) return { userId: decoded.uid || decoded.id, tokens: null };
  }

  if (refreshToken) {
    const rotated = await rotateTokens(refreshToken);
    if (rotated) return { userId: rotated.user.uid, tokens: rotated };
  }

  return null;
}

// --- GET: Fetch with Pagination & Auth ---
export async function GET(req) {
  try {
    const session = await getAuthSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const [submissions, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(query)
    ]);

    const res = NextResponse.json({
      submissions,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });

    // Handle token rotation if it happened during the session check
    if (session.tokens) {
      const isProd = process.env.NODE_ENV === 'production';
      res.cookies.set('access_token', session.tokens.accessToken, {
        httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 15 * 60 
      });
      res.cookies.set('refresh_token', session.tokens.refreshToken, {
        httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 7 * 24 * 60 * 60
      });
    }

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// --- DELETE: Remove submission with Auth ---
export async function DELETE(req) {
  try {
    const session = await getAuthSession(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}