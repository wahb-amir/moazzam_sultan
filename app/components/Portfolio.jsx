"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, X, ExternalLink, Tag, Clock, ArrowRight, Play } from "lucide-react";
import PropTypes from "prop-types";

// Matches the "Gold" theme accent from your Navbar
const ACCENT_COLOR = "#f59e0b"; 

const DEFAULT_PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: "intro",
    title: "Meet Your Instructor: Moazzam Sultan",
    category: "Introduction",
    videoUrl: "https://youtu.be/2oPoVJV4APY",
    duration: "0:59",
    tags: ["Philosophy", "Methodology", "Experience"],
    description: "A brief look into my background, teaching style, and how I use digital tools to make complex mathematics easy to understand.",
  },
  {
    id: 2,
    type: "video",
    title: "IGCSE Math: 2025 Paper 2 Walkthrough",
    category: "Cambridge IGCSE",
    videoUrl: "https://youtu.be/tsCgH-Pqdl8",
    duration: "1:51:21",
    tags: ["IGCSE", "Past Papers", "Exam Prep"],
    description: "A comprehensive, step-by-step solution of the latest IGCSE Extended Paper, focusing on exam techniques and time management.",
  },
  {
    id: 3,
    type: "video",
    title: "The Art of Rationalizing Surds",
    category: "Matric (Class 9)",
    videoUrl: "https://youtu.be/8VyvRs1yBuc",
    duration: "2:11:55",
    tags: ["Algebra", "Radicals", "Rationalization"],
    description: "Mastering the concept of surds and binomial denominators. I explain the logic behind rationalizing to simplify complex fractions.",
  },
  {
    id: 4,
    type: "video",
    title: "Understanding Angles & Geometry Basics",
    category: "Matric (Class 9)",
    videoUrl: "https://www.youtube.com/watch?v=AOkiRMqhDDw",
    duration: "1:04:09",
    tags: ["Geometry", "Quadrants", "Trigonometry"],
    description: "Exploring the fundamentals of angles, including quadrants and coterminal concepts, along with practical geometric applications.",
  },
];

const Portfolio = (props) => {
  const {
    items = DEFAULT_PORTFOLIO_ITEMS,
    initialFilter = "all",
    channelUrl = "https://www.youtube.com/@iammoazzamsultan",
    showExploreCard = true,
    containerClassName = "py-24 bg-slate-50 relative overflow-hidden",
    modalAutoplay = true,
  } = props;

  const [filter, setFilter] = useState(initialFilter);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      setMounted(false);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedItem]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] && match[1].length === 11 ? match[1] : null;
  };

  const getThumbnail = (item) => {
    const id = getYouTubeId(item.videoUrl);
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800";
  };

  const filteredItems = filter === "all" ? items : items.filter((it) => it.type === filter);

  return (
    <section id="portfolio" className={containerClassName}>
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-xs font-black tracking-widest uppercase mb-4">
              Learning Library
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Latest <span className="text-blue-600">Tutorials</span>
            </h3>
          </motion.div>

          {/* YouTube CTA - Keeping it Red for Brand Recognition, but cleaner */}
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-[#ff0000] text-white rounded-full font-bold shadow-lg shadow-red-200 transition-all"
          >
            <Youtube size={22} fill="white" />
            <span className="tracking-tight">Visit Channel</span>
          </motion.a>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-3 mb-12">
          {Array.from(new Set(["all", ...items.map((i) => i.type)])).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                filter === type
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {type === "all" ? "All Videos" : type === "intro" ? "Start Here" : "Full Lessons"}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-white rounded-[2rem] p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden mb-4">
                  <img
                    src={getThumbnail(item)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay & Play Button */}
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white text-[10px] font-bold flex items-center gap-1">
                    <Clock size={10} /> {item.duration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-3 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                     {/* Category Dot */}
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    Watch Now <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Explore Card */}
            {showExploreCard && filter === "all" && (
              <motion.a
                layout
                href={channelUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer min-h-[360px]"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Youtube className="text-[#ff0000]" size={36} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">
                  View More
                </h4>
                <p className="text-slate-500 text-center mb-6 max-w-[200px]">
                  Explore the full library of 22+ tutorials on my channel.
                </p>
                <span className="px-6 py-2 bg-white text-slate-900 rounded-full text-sm font-bold shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Open Channel
                </span>
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedItem(null)}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(null);
                }}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white rounded-full transition-all border border-white/20 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-5xl overflow-hidden rounded-[2rem] shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
              >
                {/* Video Area */}
                <div className="w-full lg:w-[65%] bg-black flex items-center justify-center relative">
                  <div className="w-full aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.videoUrl)}?autoplay=${modalAutoplay ? 1 : 0}&rel=0`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title={selectedItem.title}
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-[35%] p-8 overflow-y-auto bg-white flex flex-col">
                  <div>
                    <span className="inline-block py-1 px-3 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-orange-100">
                      {selectedItem.category}
                    </span>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                      {selectedItem.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {selectedItem.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {(selectedItem.tags || []).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <a
                      href={selectedItem.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200 group"
                    >
                      Watch on YouTube
                      <ExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

Portfolio.propTypes = {
  items: PropTypes.array,
  initialFilter: PropTypes.string,
  channelUrl: PropTypes.string,
  showExploreCard: PropTypes.bool,
  containerClassName: PropTypes.string,
  modalAutoplay: PropTypes.bool,
};

export default Portfolio;