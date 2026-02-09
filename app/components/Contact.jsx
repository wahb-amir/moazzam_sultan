// src/components/Contact.jsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Mail, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">Let's Improve Your Math Skills Together</h2>
            <p className="text-slate-300 mb-10 text-lg">
              Ready to start? Book a free demo lesson or ask any questions you have. I typically respond within a few hours.
            </p>

            <div className="space-y-6">
              <a 
                href={SOCIAL_LINKS.whatsapp} 
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">WhatsApp Me</h3>
                  <p className="text-slate-400 text-sm">+92 309 7016696</p>
                </div>
                <ExternalLink className="ml-auto text-slate-500 group-hover:text-white" size={18} />
              </a>

              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Follow on Instagram</h3>
                  <p className="text-slate-400 text-sm">@iammoazzamsultan</p>
                </div>
                <ExternalLink className="ml-auto text-slate-500 group-hover:text-white" size={18} />
              </a>

              <a 
                href={SOCIAL_LINKS.email} 
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Email Me</h3>
                  <p className="text-slate-400 text-sm">sultanmoazzam3@gmail.com</p>
                </div>
                <ExternalLink className="ml-auto text-slate-500 group-hover:text-white" size={18} />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Send a Quick Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="Your number" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Topic of Interest</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-600">
                  <option>O-Levels Math</option>
                  <option>Matric Math</option>
                  <option>Cambridge Past Papers</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="How can I help you?"></textarea>
              </div>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Moazzam Sultan. All Rights Reserved.</p>
        </div>
      </div>

      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl shadow-green-900/50"
        >
          <Phone size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default Contact;
