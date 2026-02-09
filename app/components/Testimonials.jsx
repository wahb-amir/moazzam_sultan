"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, GraduationCap, Trophy, Users } from "lucide-react";
import { TESTIMONIALS } from "../data";

const Testimonials = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#fcfcfd] relative overflow-hidden"
    >
      {/* --- MATHEMATICAL BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none font-mono text-2xl">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-[10%]"
        >
          ∫ f(x)dx
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-40 right-[15%]"
        >
          ∑ n=1
        </motion.div>
        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-40 left-[20%]"
        >
          π ≈ 3.14
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-[10%]"
        >
          Δx → 0
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Trophy size={14} />
            <span>Proven Excellence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Student <span className="text-blue-600">Success</span> Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-lg md:text-xl font-medium"
          >
            Join hundreds of students who transformed their grades and
            confidence in Mathematics.
          </motion.p>
        </div>

        {/* --- TESTIMONIALS BENTO GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
            >
              {/* Top Quote Decoration */}
              <div className="absolute top-8 right-8 text-blue-50 transition-colors group-hover:text-blue-100">
                <Quote size={50} fill="currentColor" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 text-lg leading-relaxed mb-10 relative z-10 font-medium">
                "{t.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t border-slate-50 pt-8">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
                    {t.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-base">
                    {t.name}
                  </h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap size={14} />
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Hover Highlight Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-[2.5rem] transition-all pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* --- SOCIAL PROOF STATS --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 items-center py-10 border-y border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">500+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Students Taught
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Star size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">98%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Success Rate
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Trophy size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                A* Grades
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                O/A Level Results
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
