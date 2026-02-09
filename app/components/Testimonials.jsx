// src/components/Testimonials.jsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Student Success Stories</h2>
          <p className="text-slate-600">Don't just take my word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative"
            >
              <div className="text-6xl text-blue-200 font-serif absolute top-4 left-6">"</div>
              <p className="text-slate-700 relative z-10 pt-6 mb-6 leading-relaxed">
                {t.text}
              </p>
              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
