// src/components/Navbar.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // you can use for shrink effects later
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1100 : false
  );

  // initial check + listeners
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => setIsDesktop(window.innerWidth >= 1100);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Smooth Scroll Function
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);

    if (elem) {
      const offset = 80; // Height of the navbar (adjust if you change header height)
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      // ALWAYS white background now; stays white across the whole page
      className="fixed top-0 left-0 w-full z-[9999] bg-white shadow-md transition-all duration-300"
    >
      <div className="container mx-auto px-6 flex justify-between items-center py-3">
        {/* Logo (always dark since bg is white) */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="text-2xl font-black tracking-tighter text-slate-900"
        >
          MOAZZAM<span className="text-blue-600">.</span>
        </a>

        {/* Desktop Nav — controlled by isDesktop (breakpoint: 1200px) */}
        {isDesktop ? (
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2 text-sm font-bold transition-all duration-200 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
              >
                {link.name}
              </a>
            ))}
            <div className="ml-4 pl-4 border-l border-slate-200/20">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full text-sm font-bold bg-blue-600 text-white shadow-lg hover:bg-blue-700"
              >
                Book Trial
              </a>
            </div>
          </div>
        ) : (
          // Mobile Toggle shown when width < 1200px
          <button
            className="p-2 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="text-slate-900" size={28} />
            ) : (
              <Menu className="text-slate-900" size={28} />
            )}
          </button>
        )}

        {/* Mobile Menu Overlay (renders only when isDesktop === false and isOpen === true) */}
        <AnimatePresence>
          {!isDesktop && isOpen && (
            <>
              {/* Dark Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              />

              {/* Slide-in Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-2xl p-8 flex flex-col"
              >
                <div className="flex justify-between items-center mb-12">
                  <span className="text-xl font-black text-slate-900">NAVIGATION</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-full" aria-label="Close menu">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, i) => (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="flex items-center justify-between text-2xl font-bold text-slate-800 hover:text-blue-600 py-2 border-b border-slate-50"
                    >
                      {link.name}
                      <ArrowRight size={20} className="text-slate-300" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-xl"
                  >
                    Book Free Demo
                  </a>
                  <p className="text-center text-slate-400 text-sm mt-6 font-medium">
                    Available for O/A Levels & Punjab Board
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
