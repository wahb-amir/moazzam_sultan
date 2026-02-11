"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import { SOCIAL_LINKS as DEFAULT_SOCIALS } from "../data";

const DEFAULT_MATH_SYMBOLS = [
  "∫₀ⁿ f(x)dx",
  "∑ᵢ₌₁ⁿ xᵢ",
  "π",
  "√x",
  "e=mc²",
  "sin(θ)",
  "cos(2θ)",
  "dy/dx",
  "∞",
  "∂u/∂t",
  "∇f",
  "limₓ→∞",
  "∫∫_D",
  "x = \\frac{-b ± √b²-4ac}{2a}",
  "A ∩ B",
  "∀x ∈ ℝ",
  "∃y",
  "f: A → B",
  "log₁₀(x)",
  "矩阵",
  "λ",
  "Δ",
  "Matrices",
  "x² + y² = r²",
  "θ",
  "α + β + γ = 180°",
  "∴",
  "∵",
  "≡",
];

export default function Hero({
  badgeText = "Mathematics Tutor • MSc Mathematics",
  title = {
    pre: "Moazzam",
    highlight: "Sultan",
    level: 1,
  },
  subtitle = "Mastering Mathematics, one step at a time.",
  description = "Clear, interactive lessons for O-Levels, Matric, and beyond.",
  primaryAction = {
    text: "Watch Tutorials",
    href: DEFAULT_SOCIALS?.youtube || "#",
  },
  secondaryAction = { text: "Contact Me", scrollToId: "contact" },
  socials = DEFAULT_SOCIALS,
  video = {
    src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-and-white-lines-9973-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1920",
  },
  particleSymbols = DEFAULT_MATH_SYMBOLS,
  particleCount = 14,
  className = "",
}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      symbol:
        particleSymbols[Math.floor(Math.random() * particleSymbols.length)],
      left: Math.floor(Math.random() * 100),
      duration: Math.floor(Math.random() * 10) + 10,
      delay: Math.floor(Math.random() * 5),
      size: Math.floor(Math.random() * 20) + 14,
      rotation: Math.floor(Math.random() * 360),
    }));
    setParticles(newParticles);
  }, [particleCount, particleSymbols]);

  const handleSecondary = (e) => {
    e?.preventDefault();
    if (secondaryAction?.scrollToId) {
      const section = document.getElementById(secondaryAction.scrollToId);
      if (section)
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      else console.error(`${secondaryAction.scrollToId} not found`);
    } else if (secondaryAction?.href) {
      if (secondaryAction.openInNewTab)
        window.open(secondaryAction.href, "_blank");
      else window.location.href = secondaryAction.href;
    }
  };

  const HeadingTag = `h${title.level >= 1 && title.level <= 6 ? title.level : 1}`;

  return (
    <section
      id="hero"
      className={`relative h-screen w-full overflow-hidden flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ y: -100, opacity: 0, rotate: particle.rotation }}
            animate={{
              y: "110vh",
              opacity: [0, 1, 0.5, 0],
              rotate: particle.rotation + 360,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
            className="absolute text-white/50 font-serif font-bold select-none blur-[1px]"
            style={{
              left: `${particle.left}%`,
              fontSize: `${particle.size}px`,
            }}
            aria-hidden
          >
            {particle.symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {badgeText && (
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
              {badgeText}
            </span>
          )}

          <HeadingTag className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {title.pre} <span className="text-blue-500">{title.highlight}</span>
          </HeadingTag>

          {subtitle && (
            <p className="text-xl md:text-2xl text-slate-200 mb-4 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-md md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryAction && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={primaryAction.href}
                target={primaryAction.openInNewTab ? "_blank" : "_self"}
                rel={
                  primaryAction.openInNewTab ? "noreferrer noopener" : undefined
                }
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full flex items-center gap-2 shadow-xl hover:bg-slate-100 transition-colors min-w-[180px] justify-center"
                aria-label={primaryAction.text}
              >
                <Play size={20} className="fill-slate-900" />
                {primaryAction.text}
              </motion.a>
            )}

            {secondaryAction && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSecondary}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full flex items-center gap-2 shadow-xl hover:bg-blue-700 transition-colors min-w-[180px] justify-center cursor-pointer"
                aria-label={secondaryAction.text}
              >
                {secondaryAction.text}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce z-10"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

Hero.propTypes = {
  badgeText: PropTypes.string,
  title: PropTypes.shape({
    pre: PropTypes.string,
    highlight: PropTypes.string,
    level: PropTypes.number,
  }),
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryAction: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    openInNewTab: PropTypes.bool,
  }),
  secondaryAction: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    scrollToId: PropTypes.string,
    openInNewTab: PropTypes.bool,
  }),
  socials: PropTypes.object,
  video: PropTypes.shape({ src: PropTypes.string, poster: PropTypes.string }),
  particleSymbols: PropTypes.array,
  particleCount: PropTypes.number,
  className: PropTypes.string,
};
