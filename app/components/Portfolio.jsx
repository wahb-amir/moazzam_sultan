// src/components/Portfolio.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Youtube, X, ExternalLink } from "lucide-react";
import { PORTFOLIO_ITEMS, SOCIAL_LINKS } from "../data";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  // Helper to extract YouTube ID from various URL formats
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const filteredItems = filter === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.type === filter);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedItem]);

  return (
    <section id="portfolio" className="py-20 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Tutorials & Resources
            </h2>
            <p className="text-slate-600 text-lg">
              Simplifying Punjab Curriculum and Cambridge Math through visual learning.
            </p>
          </div>
          <a 
            href="https://www.youtube.com/@iammoazzamsultan" 
            target="_blank" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold text-sm shadow-lg shadow-red-100 w-fit"
          >
            <Youtube size={18} />
            Subscribe on YouTube
          </a>
        </div>

        {/* Improved Filter Bar - Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:justify-center">
          {["all", "video", "photo", "achievement"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                filter === f
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {f === "achievement" ? "🏆 Achievements" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.type === "video" ? item.thumbnail : item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Glassmorphism Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/20 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 flex items-center justify-center">
                    {item.type === "video" && (
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Play className="fill-blue-600 text-blue-600 ml-1" size={28} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Video Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-800" />
              </button>

              <div className="flex flex-col">
                <div className="aspect-video w-full bg-black">
                  {selectedItem.type === "video" ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.videoUrl || 'https://www.youtube.com/watch?v=q668W2-W_K8')}?autoplay=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img src={selectedItem.src} alt={selectedItem.title} className="w-full h-full object-contain" />
                  )}
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                      {selectedItem.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-slate-600">
                    Join my sessions to master math concepts with ease. I provide step-by-step guidance for O/A Levels and Punjab Board students.
                  </p>
                  <div className="mt-6 flex gap-4">
                     <a href={SOCIAL_LINKS.youtube} className="flex-1 py-3 bg-red-600 text-white text-center rounded-xl font-bold hover:bg-red-700 transition-colors">
                        Watch on YouTube
                     </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;