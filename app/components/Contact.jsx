"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  ExternalLink,
  Send,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Instagram,
  AlertCircle,
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SOCIAL_LINKS } from "../data";

const Contact = () => {
  const [formState, setFormState] = useState("idle"); // idle, sending, sent, error
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const CHARACTER_LIMIT = 500;

  // Handles input changes for name, email, and message
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > CHARACTER_LIMIT) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone }),
      });

      if (response.ok) {
        setFormState("sent");
        // Clear form after success
        setFormData({ name: "", email: "", message: "" });
        setPhone("");
        // Reset button after 5 seconds
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch (error) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white text-slate-900 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] pointer-events-none opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* LEFT COLUMN */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">
                Available for Demo
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-slate-900 tracking-tight"
            >
              Ready to Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                Mathematics?
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-600 mb-12 text-lg md:text-xl leading-relaxed max-w-md font-medium"
            >
              Struggling with Calculus or Algebra? Reach out and let’s make Math
              your favorite subject.
            </motion.p>

            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "WhatsApp",
                  val: "+92 309 7016696",
                  link: SOCIAL_LINKS.whatsapp,
                  color: "hover:border-green-200",
                  iconBg: "bg-green-50 text-green-600",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  val: "@iammoazzamsultan",
                  link: SOCIAL_LINKS.instagram,
                  borderColor: "hover:border-pink-200",
                  iconBg: "bg-pink-100 text-pink-700",
                },
                {
                  icon: Mail,
                  label: "Email Me",
                  val: "sultanmoazzam3@gmail.com",
                  link: `mailto:sultanmoazzam3@gmail.com`,
                  color: "hover:border-blue-200",
                  iconBg: "bg-blue-50 text-blue-600",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  href={item.link}
                  target="_blank"
                  className={`flex items-center gap-5 p-5 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-100 transition-all duration-300 group ${item.color} hover:shadow-xl hover:shadow-slate-200/50`}
                >
                  <div
                    className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-lg font-bold text-slate-800">
                      {item.val}
                    </p>
                  </div>
                  <ExternalLink
                    className="ml-auto text-slate-300 group-hover:text-blue-600 transition-colors"
                    size={20}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
              <h3 className="text-2xl font-bold mb-10 text-slate-900 flex items-center gap-3">
                Send a Message{" "}
                <MessageCircle className="text-blue-600" size={24} />
              </h3>

              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                      placeholder="name@email.com"
                    />
                  </div>

                  <div className="space-y-2 contact-phone-input">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                      Phone
                    </label>
                    <PhoneInput
                      country={"pk"}
                      value={phone}
                      onChange={setPhone}
                      containerClass="phone-container"
                      inputClass="!w-full !h-[58px] !bg-slate-50 !border-slate-100 !rounded-2xl !text-slate-900 !font-sans !text-base focus:!border-blue-500 focus:!bg-white focus:!ring-4 focus:!ring-blue-500/5"
                      buttonClass="!bg-transparent !border-slate-100 !rounded-l-2xl hover:!bg-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Your Inquiry
                    </label>
                    <span
                      className={`text-[10px] font-bold ${formData.message.length === CHARACTER_LIMIT ? "text-red-500" : "text-slate-400"}`}
                    >
                      {formData.message.length}/{CHARACTER_LIMIT}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none font-medium"
                    placeholder="Describe what you need help with..."
                  ></textarea>
                </div>

                <button
                  disabled={formState === "sending" || formState === "sent"}
                  className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-sm relative overflow-hidden transition-all transform active:scale-95 shadow-lg ${
                    formState === "sent"
                      ? "bg-green-500 text-white"
                      : formState === "error"
                        ? "bg-red-500 text-white"
                        : "bg-slate-900 text-white hover:bg-blue-600"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <Send size={18} /> Send Inquiry
                      </motion.div>
                    )}
                    {formState === "sending" && (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      </motion.div>
                    )}
                    {formState === "sent" && (
                      <motion.div
                        key="sent"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={20} /> Message Sent Successfully!
                      </motion.div>
                    )}
                    {formState === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <AlertCircle size={20} /> Something went wrong
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        .phone-container .form-control {
          background: #f8fafc !important;
          border: 1px solid #f1f5f9 !important;
          color: #0f172a !important;
          font-weight: 500 !important;
        }
        .phone-container .country-list {
          background: white !important;
          color: #1e293b !important;
          border-radius: 1rem !important;
          padding: 10px !important;
          border: 1px solid #f1f5f9 !important;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;
