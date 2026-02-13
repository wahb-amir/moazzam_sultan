"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, Sparkles } from "lucide-react";
import PropTypes from "prop-types";

const DEFAULT_MATH_SYMBOLS = [
  "∫", "∑", "π", "√x", "e=mc²", "sin(θ)", "dy/dx", "∞", "∇f", "lim", "λ", "Δ", "≈", "≠"
];

const THEME_PALETTES = {
  cyber: { // New high-pop theme
    accent: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
    accentSolid: "#00f2fe",
    badgeBg: "rgba(0, 242, 254, 0.15)",
    badgeBorder: "rgba(0, 242, 254, 0.4)",
    badgeText: "#00f2fe",
    primaryBtn: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    secondaryBg: "rgba(255, 255, 255, 0.05)",
    secondaryBorder: "1px solid rgba(255, 255, 255, 0.2)",
    particleColors: ["#00f2fe", "#a29bfe", "#74b9ff", "#dfe6e9"],
    glow: "0 0 20px rgba(0, 242, 254, 0.5)",
  },
  sunset: { // Popping warm colors
    accent: "linear-gradient(90deg, #ff0844 0%, #ffb199 100%)",
    accentSolid: "#ff0844",
    badgeBg: "rgba(255, 8, 68, 0.15)",
    badgeBorder: "rgba(255, 8, 68, 0.4)",
    badgeText: "#ffb199",
    primaryBtn: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
    secondaryBg: "rgba(255, 255, 255, 0.1)",
    secondaryBorder: "1px solid rgba(255, 8, 68, 0.3)",
    particleColors: ["#ff0844", "#ffb199", "#fbc2eb", "#fad0c4"],
    glow: "0 0 20px rgba(255, 8, 68, 0.4)",
  },
  electric: { // Vibrant purple/pink
    accent: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    accentSolid: "#a29bfe",
    badgeBg: "rgba(162, 155, 254, 0.15)",
    badgeBorder: "rgba(162, 155, 254, 0.4)",
    badgeText: "#ef81ff",
    primaryBtn: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    secondaryBg: "rgba(255, 255, 255, 0.05)",
    secondaryBorder: "1px solid rgba(162, 155, 254, 0.3)",
    particleColors: ["#a29bfe", "#6c5ce7", "#fd79ae", "#fab1a0"],
    glow: "0 0 20px rgba(108, 92, 231, 0.5)",
  }
};

export default function Hero({
  badgeText = "Mathematics Tutor • MSc Mathematics",
  title = { pre: "Moazzam", highlight: "Sultan", level: 1 },
  subtitle = "Mastering Mathematics, one step at a time.",
  description = "Clear, interactive lessons for O-Levels, Matric, and beyond.",
  primaryAction = { text: "Watch Tutorials", href: "#" },
  secondaryAction = { text: "Contact Me", scrollToId: "contact" },
  video = {
    src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-and-white-lines-9973-large.mp4",
    poster: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1920",
  },
  theme = "cyber",
}) {
  const [particles, setParticles] = useState([]);
  const palette = THEME_PALETTES[theme] || THEME_PALETTES.cyber;

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      symbol: DEFAULT_MATH_SYMBOLS[Math.floor(Math.random() * DEFAULT_MATH_SYMBOLS.length)],
      left: Math.floor(Math.random() * 100),
      duration: Math.floor(Math.random() * 12) + 15,
      delay: Math.floor(Math.random() * 10),
      size: Math.floor(Math.random() * 15) + 15,
      color: palette.particleColors[Math.floor(Math.random() * palette.particleColors.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
  }, [theme, palette.particleColors]);

  const HeadingTag = `h${title.level}`;

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#020617]" id="hero">
      {/* Background Video with darker overlay for better pop */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30" poster={video.poster}>
          <source src={video.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
      </div>

      {/* Floating Dynamic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, p.opacity, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
            className="absolute font-serif font-bold italic"
            style={{ left: `${p.left}%`, fontSize: `${p.size}px`, color: p.color, filter: `drop-shadow(0 0 5px ${p.color})` }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          
          {/* Badge */}
          {badgeText && (
            <span
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-bold mb-8 uppercase tracking-widest backdrop-blur-md"
              style={{ backgroundColor: palette.badgeBg, border: `-10px solid ${palette.badgeBorder}`, color: palette.badgeText, boxShadow: palette.glow }}
            >
              <Sparkles size={15} /> {badgeText}
            </span>
          )}

          {/* Main Title with Gradient Text */}
          <HeadingTag className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
            {title.pre}{" "}
            <span style={{ background: palette.accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(${palette.glow})` }}>
              {title.highlight}
            </span>
          </HeadingTag>

          <p className="text-xl md:text-2xl mb-4 font-light text-slate-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <p className="text-slate-400 mb-10 max-w-lg mx-auto">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: palette.glow }}
              whileTap={{ scale: 0.95 }}
              href={primaryAction.href}
              className="px-10 py-4 rounded-full font-extrabold text-slate-950 flex items-center gap-3 transition-all"
              style={{ background: palette.primaryBtn }}
            >
              <Play size={20} fill="currentColor" />
              {primaryAction.text}
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-bold text-white backdrop-blur-sm transition-all"
              style={{ background: palette.secondaryBg, border: palette.secondaryBorder }}
            >
              {secondaryAction.text}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={32} style={{ color: palette.accentSolid, filter: `drop-shadow(${palette.glow})` }} />
      </motion.div>
    </section>
  );
}