import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "viewer"],
      default: "admin",
    },
    avatar: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
    },
    magicToken: { type: String, select: false },
    magicTokenExpires: { type: Date, select: false },
  },

  {
    timestamps: true,
  },
);

// Prevent re-compiling the model in Next.js development
const User = models.User || model("User", UserSchema);

export default User;
