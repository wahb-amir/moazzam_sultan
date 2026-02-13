"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Youtube,
  Download,
  ArrowRight,
  Clock,
  Calendar,
  Award,
  CheckCircle2,
  MapPin
} from "lucide-react";
import * as Icons from "lucide-react";
import PropTypes from "prop-types";

// --- Configuration ---
const ELECTRIC_BLUE = "#2563eb";
const GOLD_ACCENT = "#f59e0b";

// Resolve an icon value that might be either a component or a string name
function resolveIcon(icon) {
  if (!icon) return null;
  if (typeof icon === "string") {
    return Icons[icon] || null;
  }
  return icon;
}

function renderIcon(icon, props = {}) {
  const Icon = resolveIcon(icon);
  return Icon ? <Icon {...props} /> : null;
}

const DEFAULT_AVAILABILITY = {
  status: "limited",
  note: "Currently at near-full capacity. Only 2 weekend slots remaining for new IGCSE students.",
  timezone: "GMT+5 (PKT)",
  hours: ["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  schedule: [
    [0, 0, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
};

const DEFAULT_STATS = [
  { icon: Award, value: "4+", label: "Years Experience" },
  { icon: Calendar, value: "200+", label: "Lessons Delivered" },
  { icon: CheckCircle2, value: "100%", label: "Success Rate" },
  { icon: Youtube, value: "300+", label: "Video Tutorials" },
];

const DEFAULT_SOCIALS = {
  youtube: "https://youtube.com/",
  whatsapp: "https://wa.me/",
};

export default function About(props) {
  const {
    id = "about",
    containerClassName = "py-24 bg-white relative overflow-hidden",
    portrait = {},
    intro = {},
    copy = {},
    primaryAction = {
      text: "Book a Free Trial",
      href: DEFAULT_SOCIALS.whatsapp,
      openInNewTab: true,
    },
    resumeAction = { text: "Download Resume", href: "#" },
    availability = DEFAULT_AVAILABILITY,
    stats = DEFAULT_STATS,
    statStyles = null,
  } = props;

  const {
    src: portraitSrc = "/face.avif",
    alt: portraitAlt = "Instructor",
    badge = { text: "MSc Mathematics", icon: Award },
  } = portrait;

  const {
    eyebrow = "Expert Mathematics Pedagogy",
    titlePre = "Turning confusion into",
    titleHighlight = "Mathematical Clarity.",
  } = intro;

  const {
    lead = `As a Master’s degree holder with over 4 years of specialized experience, I don't just teach formulas—I build logical foundations that last a lifetime.`,
    tags = ["O/A Levels", "IGCSE", "Calculus", "Algebra"],
    quote = `My virtual classroom mimics a physical whiteboard experience using high-precision digital tablets for real-time problem-solving.`,
  } = copy;

  const sectionRef = useRef(null);
  const circleControls = useAnimation();
  const [circumference] = useState(289); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          circleControls.start({
            strokeDashoffset: 0,
            transition: { duration: 1.5, ease: "easeInOut" },
          });
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [circleControls]);

  // Updated Styles to match new palette
  const STAT_STYLES = useMemo(
    () =>
      statStyles || [
        {
          gradient: "from-blue-500 to-cyan-400",
          bg: "bg-blue-50",
          text: "text-blue-600",
          pct: 95,
        },
        {
          gradient: "from-amber-400 to-orange-500", // Gold/Orange
          bg: "bg-orange-50",
          text: "text-orange-600",
          pct: 88,
        },
        {
          gradient: "from-emerald-500 to-teal-400",
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          pct: 100,
        },
        {
          gradient: "from-indigo-500 to-purple-500",
          bg: "bg-indigo-50",
          text: "text-indigo-600",
          pct: 92,
        },
      ],
    [statStyles],
  );

  return (
    <section id={id} ref={sectionRef} className={containerClassName}>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-center mb-24">
          
          {/* --- LEFT: Portrait --- */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Pulsing Back Glow */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl -z-10"
              />

              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Image Container */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-[6px] border-white shadow-2xl z-10">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={portraitSrc}
                    alt={portraitAlt}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>

                {/* SVG Ring Animation */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full -rotate-90 z-20 pointer-events-none"
                >
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={ELECTRIC_BLUE} />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="url(#ringGrad)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{
                      strokeDasharray: circumference,
                      strokeDashoffset: circumference,
                    }}
                    animate={circleControls}
                  />
                </svg>

                {/* Floating Badge (Top Left) */}
                <motion.div 
                  initial={{ y: 0 }} animate={{ y: -5 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute top-10 -left-6 z-30 bg-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-50 flex items-center gap-3"
                >
                  <div className="p-1.5 bg-blue-50 rounded-full">
                    {renderIcon(badge?.icon, { className: "text-blue-600", size: 16 })}
                  </div>
                  <span className="text-sm font-bold text-slate-800 tracking-tight">
                    {badge?.text}
                  </span>
                </motion.div>

                {/* Status Badge (Bottom Right) */}
                <motion.div 
                  initial={{ y: 0 }} animate={{ y: 5 }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute bottom-10 -right-4 z-30 bg-white px-5 py-2.5 rounded-full shadow-xl border border-slate-50 flex items-center gap-2"
                >
                  <span className={`flex h-2.5 w-2.5 rounded-full ${availability?.status === "limited" ? "bg-amber-500" : "bg-green-500"} animate-pulse`} />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                    {availability?.statusLabel || availability?.status || "Available"}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Content --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 border border-blue-100">
              {eyebrow}
            </span>

            <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.05] tracking-tight">
              {titlePre} <br />
              <span style={{ color: ELECTRIC_BLUE }}>
                {titleHighlight}
              </span>
            </h3>

            <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: lead }} />

              <div className="flex flex-wrap gap-2">
                {(tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wide hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative pl-6 border-l-4 border-amber-400">
                <p className="italic text-slate-800 font-medium text-xl leading-normal">
                  "{quote}"
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: `0 10px 20px -5px ${ELECTRIC_BLUE}50` }}
                whileTap={{ scale: 0.95 }}
                href={primaryAction.href}
                target={primaryAction.openInNewTab ? "_blank" : undefined}
                rel={primaryAction.openInNewTab ? "noreferrer noopener" : undefined}
                className="px-8 py-4 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-xl"
                style={{ backgroundColor: ELECTRIC_BLUE }}
              >
                {primaryAction.text} <ArrowRight size={18} />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
                href={resumeAction.href}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-full font-bold flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
              >
                <Download size={18} /> {resumeAction.text}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* --- SCHEDULE SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 overflow-hidden"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />

          <div className="flex flex-col lg:flex-row gap-12 relative z-10">
            {/* Schedule Info */}
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl shadow-lg shadow-blue-100" style={{ backgroundColor: ELECTRIC_BLUE }}>
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    {availability.title || "Availability"}
                  </h4>
                  <p className="text-sm font-bold text-slate-400 mt-1">Live Schedule Update</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-8 bg-slate-50 w-fit px-4 py-2 rounded-full border border-slate-100">
                <MapPin size={16} style={{ color: ELECTRIC_BLUE }} /> 
                <span>Time Zone: <span className="text-slate-900">{availability.timezone}</span></span>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-[2rem] border border-orange-100 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <span className="font-black uppercase text-[10px] tracking-[0.2em] text-orange-600">
                     Status Update
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                  {availability.note}
                </p>
              </div>
            </div>

            {/* Interactive Grid */}
            <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[600px]">
                {/* Header Row */}
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="text-[10px] font-black uppercase text-slate-300 text-right pr-4 self-end">Time</div>
                  {(availability.days || []).map((d) => (
                    <div key={d} className="text-center text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 py-2 rounded-lg">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Time Rows */}
                <div className="space-y-2">
                  {(availability.hours || []).map((time, r) => (
                    <div key={time} className="grid grid-cols-8 gap-2 items-center">
                      <div className="text-[11px] font-bold text-slate-400 text-right pr-4">
                        {time}
                      </div>
                      {(availability.schedule?.[r] || []).map((val, c) => (
                        <motion.div
                          key={c}
                          whileHover={val ? { scale: 1.1, y: -2 } : {}}
                          className={`h-10 rounded-xl transition-all duration-300 flex items-center justify-center text-[9px] font-black tracking-tight border ${
                            val
                              ? "text-white shadow-md shadow-blue-200 cursor-pointer"
                              : "bg-slate-50 text-slate-300 border-slate-100"
                          }`}
                          style={{ 
                            backgroundColor: val ? ELECTRIC_BLUE : "",
                            borderColor: val ? ELECTRIC_BLUE : ""
                          }}
                        >
                          {val ? "OPEN" : "—"}
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="mt-6 flex items-center justify-end gap-6 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ELECTRIC_BLUE }} />
                    <span className="text-[10px] font-bold uppercase text-slate-500">Available Slot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold uppercase text-slate-400">Reserved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {(stats || []).map((stat, idx) => {
            const style = STAT_STYLES[idx % STAT_STYLES.length];
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div
                  className={`${style.bg} ${style.text} w-14 h-14 rounded-2xl flex items-center justify-center mb-5`}
                >
                  {renderIcon(stat.icon, { size: 28 })}
                </div>
                <h4 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {stat.value}
                </h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                  {stat.label}
                </p>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${style.pct}%` }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                    className={`h-full bg-gradient-to-r ${style.gradient}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

About.propTypes = {
  id: PropTypes.string,
  containerClassName: PropTypes.string,
  portrait: PropTypes.object,
  intro: PropTypes.object,
  copy: PropTypes.object,
  primaryAction: PropTypes.object,
  resumeAction: PropTypes.object,
  availability: PropTypes.object,
  stats: PropTypes.array,
  socials: PropTypes.object,
  statStyles: PropTypes.array,
};