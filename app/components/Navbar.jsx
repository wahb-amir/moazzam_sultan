"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "../data";

const THEME_PALETTES = {
  gold: {
    primary: "#1e3a8a", // Deep Blue (Logo/Links)
    buttonBg: "#2563eb", // Lighter Electric Blue (Pop Button)
    accent: "#f59e0b",   // Pop Gold
    softBg: "#fef3c7",
  },
  coral: {
    primary: "#0f172a", 
    buttonBg: "#f43f5e", 
    accent: "#fb7185",
    softBg: "#ffe4e6",
  },
  mint: {
    primary: "#134e4a",
    buttonBg: "#10b981",
    accent: "#34d399",
    softBg: "#ecfdf5",
  },
};

const Navbar = ({ theme = "gold" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const palette = THEME_PALETTES[theme] || THEME_PALETTES.gold;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const isSolid = scrolled || isOpen;
  const textColor = isSolid ? palette.primary : "#ffffff"; 
  const borderColor = isSolid ? "border-slate-200" : "border-white/20";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ease-in-out ${
        isSolid 
          ? "bg-white shadow-lg py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="text-2xl font-black tracking-tighter transition-colors duration-500"
          style={{ color: textColor }}
        >
          MOAZZAM<span style={{ color: palette.accent }}>.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-5 py-2 text-sm font-bold rounded-full transition-all relative group"
              style={{ color: textColor }}
            >
              {link.name}
              <span 
                className="absolute bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4"
                style={{ backgroundColor: palette.accent }}
              />
            </a>
          ))}

          <div className={`ml-4 pl-6 border-l transition-colors duration-500 ${borderColor}`}>
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#1d4ed8", // Slightly darker on hover
                boxShadow: `0 10px 25px -5px ${palette.buttonBg}60` 
              }}
              whileTap={{ scale: 0.95 }}
              href={SOCIAL_LINKS?.whatsapp || "#"}
              target="_blank"
              className="px-8 py-3 rounded-full text-sm font-black text-white shadow-xl flex items-center gap-2 transition-all duration-300"
              style={{ 
                backgroundColor: palette.buttonBg, // Lighter, popping blue
              }}
            >
              Book Trial
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 rounded-xl transition-all z-[10000]"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: textColor }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[9999] shadow-2xl p-8 pt-24 flex flex-col lg:hidden"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex items-center justify-between text-3xl font-black py-4 border-b border-slate-50"
                    style={{ color: palette.primary }}
                  >
                    {link.name}
                    <ArrowRight size={24} style={{ color: palette.accent }} />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto">
                <a
                  href={SOCIAL_LINKS?.whatsapp || "#"}
                  className="w-full flex items-center justify-center gap-3 py-5 text-white text-xl font-black rounded-2xl shadow-xl transition-transform active:scale-95"
                  style={{ backgroundColor: palette.buttonBg }}
                >
                  <MessageCircle size={24} fill="white" />
                  Book Free Demo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;