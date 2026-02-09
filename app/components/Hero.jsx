// src/components/Hero.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { SOCIAL_LINKS } from "../data";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 w-full h-full bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1920"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-and-white-lines-9973-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
            Mathematics Tutor • MSc Mathematics
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Moazzam <span className="text-blue-500">Sultan</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Mastering Mathematics, one step at a time. Clear, interactive
            lessons for O-Levels, Matric, and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full flex items-center gap-2 shadow-xl hover:bg-slate-100 transition-colors min-w-[180px] justify-center"
            >
              <Play size={20} className="fill-slate-900" />
              Watch Tutorials
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const section = document.getElementById("contact");
                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  console.error("contact section not found");
                }
              }}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full flex items-center gap-2 shadow-xl hover:bg-blue-700 transition-colors min-w-[180px] justify-center"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
