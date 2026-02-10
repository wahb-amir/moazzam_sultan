import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true } 
);
const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;