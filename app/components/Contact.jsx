"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SOCIAL_LINKS } from "../data";

const Contact = () => {
  const [formState, setFormState] = useState("idle");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      {/* --- LIGHT BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* LEFT COLUMN: Info */}
          <div className="lg:sticky lg:top-24">
            {/* --- Badge: More Contrast --- */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">
                Get in Touch
              </span>
            </motion.div>

            {/* --- Heading: High-Contrast Slate --- */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-slate-900"
            >
              Ready to Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Mathematics?
              </span>
            </motion.h2>

            {/* --- Paragraph: Deep Slate for reading comfort --- */}
            <motion.p
              variants={itemVariants}
              className="text-slate-600 mb-10 text-lg md:text-xl leading-relaxed max-w-md"
            >
              Whether it's O-Levels, A-Levels, or Punjab Board — I'm here to
              simplify the complex. Book your 30-minute free demo today.
            </motion.p>

            {/* --- Contact Cards: Updated for Light Theme --- */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "WhatsApp Me",
                  val: "+92 309 7016696",
                  link: SOCIAL_LINKS.whatsapp,
                  borderColor: "hover:border-green-200",
                  iconBg: "bg-green-100 text-green-700",
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
                  label: "Email",
                  val: "sultanmoazzam3@gmail.com",
                  link: `mailto:sultanmoazzam3@gmail.com`,
                  borderColor: "hover:border-blue-200",
                  iconBg: "bg-blue-100 text-blue-700",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  href={item.link}
                  target="_blank"
                  className={`flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 transition-all duration-300 group ${item.borderColor} hover:shadow-xl hover:shadow-slate-200/60`}
                >
                  <div
                    className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={24} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      {item.label}
                    </h3>
                    <p className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.val}
                    </p>
                  </div>

                  <ExternalLink
                    className="ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all text-slate-400"
                    size={20}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-10 text-slate-900 flex items-center gap-3">
                Send a Message{" "}
                <MessageCircle className="text-blue-600" size={24} />
              </h3>

              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g. Moazzam Sultan"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      placeholder="name@email.com"
                    />
                  </div>

                  <div className="space-y-2 contact-phone-input">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"pk"}
                      value={phone}
                      onChange={setPhone}
                      containerClass="phone-container"
                      inputClass="!w-full !h-[58px] !bg-slate-50 !border-slate-100 !rounded-2xl !text-slate-900 !font-sans !text-base focus:!border-blue-500 focus:!bg-white focus:!ring-4 focus:!ring-blue-500/5"
                      buttonClass="!bg-transparent !border-slate-100 !rounded-l-2xl hover:!bg-slate-100"
                      dropdownClass="!bg-white !text-slate-800 !border-slate-100 !shadow-xl"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                    How can I help?
                  </label>
                  <textarea
                    rows="4"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                    placeholder="Briefly describe your requirements..."
                  ></textarea>
                </div>

                <button
                  disabled={formState !== "idle"}
                  className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-sm relative overflow-hidden transition-all transform active:scale-95 shadow-lg ${
                    formState === "sent"
                      ? "bg-green-500 text-white"
                      : "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200"
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
                        <Send size={18} /> Send Message
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
                        <CheckCircle2 size={20} /> Message Sent!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>
            © {new Date().getFullYear()} Moazzam Sultan — Mathematics Specialist
          </p>
          <div className="flex gap-8">
            <a href="#hero" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              Profile
            </a>
            <a
              href="#schedule"
              className="hover:text-blue-600 transition-colors"
            >
              Availability
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .phone-container .form-control {
          background: #f8fafc !important; /* slate-50 */
          border: 1px solid #f1f5f9 !important; /* slate-100 */
          color: #0f172a !important; /* slate-900 */
        }
        .phone-container .country-list {
          background: white !important;
          color: #1e293b !important;
          border: 1px solid #f1f5f9 !important;
        }
        .phone-container .country-list .country:hover {
          background: #f1f5f9 !important;
        }
        .phone-container .country-list .country.highlight {
          background: #eff6ff !important;
          color: #2563eb !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;
