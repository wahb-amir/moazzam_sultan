"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Github, 
  Globe,
  Heart,
  Zap
} from "lucide-react";

// Brand Constants
const ELECTRIC_BLUE = "#2563eb";
const GOLD_ACCENT = "#f59e0b";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: "About Me", href: "#about" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Availability", href: "#about" },
    ],
    resources: [
      { name: "Math Tutorials", href: "#" },
      { name: "Free Notes", href: "#" },
      { name: "Success Stories", href: "#" },
      { name: "Book Trial", href: "#contact" },
    ],
  };

  const socials = [
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-700" },
    { icon: Mail, href: "mailto:hello@moazzam.com", color: "hover:text-blue-500" },
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* --- Brand & Newsletter --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform"
                style={{ backgroundColor: ELECTRIC_BLUE }}
              >
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                MOAZZAM<span className="text-blue-600">SULTAN.</span>
              </span>
            </div>

            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
              Empowering the next generation of logical thinkers through high-precision mathematics pedagogy.
            </p>

            {/* Newsletter Input */}
            <div className="relative max-w-sm">
              <input 
                type="email" 
                placeholder="Join the Math Circle (Email)" 
                className="w-full h-14 pl-6 pr-32 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-sm"
              />
              <button 
                className="absolute right-2 top-2 bottom-2 px-4 rounded-xl text-white text-[10px] font-black uppercase tracking-widest transition-transform active:scale-95"
                style={{ backgroundColor: ELECTRIC_BLUE }}
              >
                Join
              </button>
            </div>
          </div>

          {/* --- Links Grid --- */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Explore</h4>
              <ul className="space-y-4">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-600 font-bold hover:text-blue-600 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Resources</h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-600 font-bold hover:text-blue-600 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Badge Box */}
            <div className="col-span-2 md:col-span-1">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                  <div 
                    className="absolute -top-10 -right-10 w-24 h-24 blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                    style={{ backgroundColor: ELECTRIC_BLUE }}
                  />
                  <h4 className="text-xs font-black text-slate-900 mb-2">Need Help?</h4>
                  <p className="text-[10px] text-slate-500 font-bold mb-4 leading-relaxed">Schedule a free 15-min consultation session.</p>
                  <a href="#contact" className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 group">
                    Book Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Copyright */}
          <div className="text-slate-400 text-xs font-bold">
            © {currentYear} Moazzam Sultan. Built with <Heart size={12} className="inline text-red-500 mx-0.5" /> in Pakistan.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {socials.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                className={`text-slate-400 transition-all transform hover:scale-110 ${social.color}`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}