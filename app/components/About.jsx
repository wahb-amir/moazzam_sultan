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
} from "lucide-react";
import * as Icons from "lucide-react";

// Resolve an icon value that might be either a component or a string name
function resolveIcon(icon) {
  if (!icon) return null;
  if (typeof icon === "string") {
    // exact lookup: DATA uses "Award", "Calendar", etc.
    return Icons[icon] || null;
  }
  return icon;
}
import PropTypes from "prop-types";

// Default data (keeps previous visual and content defaults)
const DEFAULT_AVAILABILITY = {
  status: "limited",
  note: "Currently at near-full capacity. Only 2 weekend slots remaining.",
  timezone: "GMT5 (PKT)",
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
  { icon: Award, value: "4", label: "Years Experience" },
  { icon: Calendar, value: "200", label: "Lessons Delivered" },
  { icon: Clock, value: "100%", label: "On-time" },
  { icon: Youtube, value: "300", label: "Video Tutorials" },
];

const DEFAULT_SOCIALS = {
  youtube: "https://youtube.com/",
  whatsapp: "https://wa.me/",
};

export default function About(props) {
  // Top-level props with sensible defaults
  
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
    resumeAction = { text: "Resume", href: "#" },
    availability = DEFAULT_AVAILABILITY,
    stats = DEFAULT_STATS,
    socials = DEFAULT_SOCIALS,
    statStyles = null,
  } = props;

  // Nested defaults
  const {
    src: portraitSrc = "/face.avif",
    alt: portraitAlt = "Instructor",
    width = 384,
    height = 384,
    badge = { text: "MSc Math", icon: Award },
    availabilityBadge = { text: "Available", colorClass: "bg-green-500" },
  } = portrait;

  const {
    eyebrow = "Expert Mathematics Pedagogy",
    titlePre = "Crafting clarity from",
    titleHighlight = "Mathematical Chaos.",
    subtitleHTML = null,
  } = intro;

  const {
    lead = `As a Master’s degree holder with over 4 years of specialized experience, I don't just teach formulas—I build logical foundations.`,
    tags = ["O/A Levels", "Punjab Board", "Calculus"],
    quote = `My virtual classroom mimics a physical whiteboard experience using high-precision digital tablets for real-time problem-solving.`,
  } = copy;

  const sectionRef = useRef(null);
  const circleControls = useAnimation();
  const [circumference] = useState(289); // visual ring fallback

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
          gradient: "from-purple-500 to-indigo-400",
          bg: "bg-purple-50",
          text: "text-purple-600",
          pct: 88,
        },
        {
          gradient: "from-emerald-500 to-teal-400",
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          pct: 100,
        },
        {
          gradient: "from-orange-500 to-yellow-400",
          bg: "bg-orange-50",
          text: "text-orange-600",
          pct: 92,
        },
      ],
    [statStyles],
  );

  return (
    <section id={id} ref={sectionRef} className={containerClassName}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-center mb-20">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl -z-10"
              />

              <div
                className={`relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96`}
              >
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    src={portraitSrc}
                    alt={portraitAlt}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>

                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full -rotate-90 z-20 pointer-events-none"
                >
                  <defs>
                    <linearGradient
                      id="ringGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
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

                <div className="absolute top-8 -left-4 z-30 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-2">
                  {badge?.icon
                    ? React.createElement(badge.icon, {
                        className: "text-blue-600",
                        size: 18,
                      })
                    : null}
                  <span className="text-sm font-bold text-slate-800 tracking-tight">
                    {badge?.text}
                  </span>
                </div>

                <div className="absolute bottom-12 -right-4 z-30 bg-white px-4 py-2 rounded-full shadow-xl border border-slate-50 flex items-center gap-2">
                  <span
                    className={`flex h-2 w-2 rounded-full ${availability?.status === "limited" ? "bg-orange-500" : "bg-green-500"} animate-pulse`}
                  />
                  <span className="text-xs font-black uppercase text-slate-700">
                    {availability?.statusLabel ||
                      availability?.status ||
                      "Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-widest rounded-full mb-6">
              {eyebrow}
            </span>

            <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
              {titlePre} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                {titleHighlight}
              </span>
            </h3>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: lead }} />

              <div className="flex flex-wrap gap-3">
                {(tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative p-6 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="italic text-slate-700 font-medium">{quote}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={primaryAction.href}
                target={primaryAction.openInNewTab ? "_blank" : undefined}
                rel={
                  primaryAction.openInNewTab ? "noreferrer noopener" : undefined
                }
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                {primaryAction.text} <ArrowRight size={18} />
              </a>
              <a
                href={resumeAction.href}
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                <Download size={18} /> {resumeAction.text}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 blur-[100px] rounded-full -z-10" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/40 blur-[100px] rounded-full -z-10" />

          <div className="flex flex-col lg:flex-row justify-between gap-12 relative z-10">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                  <Calendar className="text-white" size={20} />
                </div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                  {availability.title || "Weekly Schedule"}
                </h4>
              </div>

              <p className="text-slate-500 font-medium mb-8 flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> Time Zone:{" "}
                <span className="text-slate-900">{availability.timezone}</span>
              </p>

              <div className="bg-slate-50/80 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/50 blur-2xl rounded-full" />

                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-black uppercase text-[10px] tracking-[0.2em] text-orange-600">
                    {availability.statusLabel || "Current Status"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium relative z-10">
                  {availability.note}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto no-scrollbar">
              <div className="min-w-[600px] p-1">
                <div className="grid grid-cols-8 gap-3 mb-6">
                  <div />
                  {(availability.days || []).map((d) => (
                    <div
                      key={d}
                      className="text-center text-[11px] font-black uppercase tracking-widest text-slate-400"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {(availability.hours || []).map((time, r) => (
                    <div
                      key={time}
                      className="grid grid-cols-8 gap-3 items-center"
                    >
                      <div className="text-[11px] font-bold text-slate-400 text-right pr-4">
                        {time}
                      </div>
                      {(availability.schedule?.[r] || []).map((val, c) => (
                        <motion.div
                          key={c}
                          whileHover={val ? { scale: 1.05, y: -2 } : {}}
                          className={`h-12 rounded-2xl transition-all duration-300 flex items-center justify-center text-[10px] font-black tracking-tighter ${val ? "bg-blue-600 text-white shadow-md shadow-blue-100 cursor-pointer hover:bg-blue-700" : "bg-slate-50 text-slate-300 border border-slate-100/50"}`}
                        >
                          {val ? "BOOK" : "—"}
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-end gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      Reserved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {(stats || []).map((stat, idx) => {
            const style = STAT_STYLES[idx % STAT_STYLES.length];
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
              >
                <div
                  className={`${style.bg} ${style.text} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}
                >
                  {stat.icon
                    ? React.createElement(stat.icon, { size: 24 })
                    : null}
                </div>
                <h4 className="text-3xl font-black text-slate-900">
                  {stat.value}
                </h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  {stat.label}
                </p>

                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${style.pct}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
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
  portrait: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    badge: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.elementType,
    }),
    availabilityBadge: PropTypes.shape({
      text: PropTypes.string,
      colorClass: PropTypes.string,
    }),
  }),
  intro: PropTypes.shape({
    eyebrow: PropTypes.string,
    titlePre: PropTypes.string,
    titleHighlight: PropTypes.string,
    subtitleHTML: PropTypes.string,
  }),
  copy: PropTypes.shape({
    lead: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    quote: PropTypes.string,
  }),
  primaryAction: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    openInNewTab: PropTypes.bool,
  }),
  resumeAction: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  }),
  availability: PropTypes.shape({
    status: PropTypes.string,
    note: PropTypes.string,
    timezone: PropTypes.string,
    hours: PropTypes.array,
    days: PropTypes.array,
    schedule: PropTypes.arrayOf(PropTypes.array),
  }),
  stats: PropTypes.array,
  socials: PropTypes.object,
  statStyles: PropTypes.array,
};
