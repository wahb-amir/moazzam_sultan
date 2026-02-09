"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Youtube,
  X,
  ExternalLink,
  Tag,
  BookOpen,
  Clock,
} from "lucide-react";

// Real Data from Moazzam Sultan's Channel
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: "video",
    title: "Exercise 6.1 | Class 9 Maths New Book 2025 | PCTB Chapter 6 ",
    category: "Punjab Board",
    videoUrl: "https://www.youtube.com/watch?v=AOkiRMqhDDw",
    duration: "1:04:09",
    tags: ["Class 9"],
    description:
      "Step-by-step solution for Quadratic Equations following the Punjab Curriculum and Textbook Board.",
  },
  {
    id: 2,
    type: "video",
    title: "IGCSE Maths 0580 Paper 2 (Extended) Solved | Feb/March 2025 | With Explanation",
    category: "Cambridge IGCSE",
    videoUrl: "https://youtu.be/tsCgH-Pqdl8?si=O8O5Yj3jozZv1QQo", 
    duration: "1:51:21",
    tags: [],
    description:
      "Mastering Sine and Cosine rules with Cambridge topical past paper examples.",
  },
  {
    id: 3,
    type: "video",
    title: "Exercise 1.2 | Class 9 Maths New Book 2025 | PCTB Chapter 1 Solutions",
    category: "Achievement",
    videoUrl: "https://youtu.be/8VyvRs1yBuc?si=5PCUoqBEJLaGb8aZ",
    duration: "2:11:55",
    tags: [],
    description:
      "A look into my interactive setup using a stylus and digital whiteboard for clear learning.",
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  // Extract YouTube ID and get high-quality thumbnail
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getThumbnail = (item) => {
    if (item.type === "video") {
      const id = getYouTubeId(item.videoUrl);
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }
    return item.src;
  };

  const filteredItems =
    filter === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter(
          (item) =>
            item.type === filter ||
            (filter === "video" && item.type === "video"),
        );

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "unset";
  }, [selectedItem]);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">
              Masterclass Library
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Interactive <span className="text-blue-600">Tutorials</span>
            </h3>
            <p className="text-slate-500 mt-4 text-lg max-w-xl">
              Real sessions from my YouTube channel covering Punjab Board and
              Cambridge Mathematics.
            </p>
          </motion.div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.youtube.com/@iammoazzamsultan"
            target="_blank"
            className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-2xl shadow-red-200 hover:bg-red-700 transition-all"
          >
            <Youtube size={24} />
            Visit My Channel
          </motion.a>
        </div>

        {/* Filter Navigation */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {["all", "video", "achievement"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold capitalize transition-all border ${
                filter === f
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                  : "bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {f === "all" ? "Everything" : f + "s"}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={getThumbnail(item)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Item Overlay Stats */}
                  {item.type === "video" && (
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/20">
                        <Clock size={12} /> {item.duration}
                      </span>
                    </div>
                  )}

                  {/* Centered Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 px-2 py-1 bg-blue-50 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Video / Image Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-[110] p-3 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                {/* Media Side */}
                <div className="lg:w-2/3 bg-black aspect-video flex items-center justify-center">
                  {selectedItem.type === "video" ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.videoUrl)}?autoplay=1`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img
                      src={selectedItem.src}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Info Side */}
                <div className="lg:w-1/3 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                      {selectedItem.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                      {selectedItem.description}
                    </p>

                    {selectedItem.tags && (
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-400"
                          >
                            <Tag size={12} /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-12 space-y-4">
                    <a
                      href={
                        selectedItem.videoUrl || "https://wa.me/923097016696"
                      }
                      target="_blank"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all group"
                    >
                      {selectedItem.type === "video"
                        ? "Watch on YouTube"
                        : "Inquire Now"}
                      <ExternalLink
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
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
