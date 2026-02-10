// models/Portfolio.ts
import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  published: { type: Object }, // This is what the public sees
  draft: { type: Object },     // This is what you edit in the dashboard
  lastPublishedAt: Date,
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);