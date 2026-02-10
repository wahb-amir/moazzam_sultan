import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectToDb from "../../../lib/mongo";
import User from "../../../modal/user";
import {Session} from "../../../modal/session";
import { sendSecurityAlert } from "../../../lib/email";

export async function POST(req) {
  try {
    const { email, password, fingerprint } = await req.json();
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    // 1. Basic Setup & DB Connection
    await connectToDb();
    const user = await User.findOne({ email }).select("+password");
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // 2. Password Check
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // 3. Metadata Extraction (Geolocation & Device)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";
    // Vercel provides 'x-vercel-ip-country', otherwise use a lookup service
    const currentCountry = req.headers.get("x-vercel-ip-country") || "unknown";

    // 4. Country Change Challenge
    const lastSession = await Session.findOne({ userId: user._id }).sort({ createdAt: -1 });
    if (lastSession && lastSession.country !== currentCountry && currentCountry !== "unknown") {
      // Logic for Magic Link Challenge would go here
      // For now, we'll log it and alert, but you could return a 403 to force Magic Link
      console.warn(`Country mismatch: ${lastSession.country} -> ${currentCountry}`);
    }

    // 5. Single Active Session (Invalidate old ones)
    await Session.updateMany({ userId: user._id, isValid: true }, { isValid: false });

    // 6. Create Tokens & Session Record
    const payload = { id: user._id, role: user.role };
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "1d" });

    const newSession = await Session.create({
      userId: user._id,
      refreshToken, // Storing hash is better, but storing raw works for simple invalidation
      fingerprint,
      country: currentCountry,
      ip,
      userAgent,
      isValid: true
    });

    // 7. Security Notification (Asynchronous)
    // Don't 'await' this to keep login fast
    sendSecurityAlert(user.email, {
      ip,
      country: currentCountry,
      device: userAgent
    }).catch(console.error);

    // 8. Prepare Response & Cookies
    user.lastLogin = new Date();
    await user.save();

    const response = NextResponse.json({
      user: { id: user._id, email: user.email, role: user.role, name: user.name }
    });

    const cookieOpts = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };

    response.cookies.set("access_token", accessToken, { ...cookieOpts, maxAge: 900 });
    response.cookies.set("refresh_token", refreshToken, { ...cookieOpts, maxAge: 86400 });
    
    // Store session ID in a non-httpOnly cookie if you need to track it on client
    response.cookies.set("session_id", newSession._id.toString(), { ...cookieOpts, httpOnly: false });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}