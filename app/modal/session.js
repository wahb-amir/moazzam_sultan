// models/Session.ts
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: String,
  deviceFingerprint: String,
  country: String,
  ip: String,
  userAgent: String,
  isValid: { type: Boolean, default: true },
}, { timestamps: true });

export const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema);