import React from 'react';
import { 
  Play, 
  Calendar, 
  Clock, 
  Award, 
  ArrowRight, 
  Star, 
  Youtube, 
  MessageCircle,
  Users,
  Trophy
} from 'lucide-react';

function PreviewPanel({ data }) {
  if (!data) return null;

  // Destructure for easier access
  const { 
    hero = {}, 
    about = {}, 
    stats = [], 
    library = [], 
    testimonials = [], 
    contact = {}, 
    schedule = {} 
  } = data;

  // Split name logic from Hero.jsx
  const nameParts = (hero.name || "Moazzam Sultan").split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="bg-white min-h-full font-sans text-slate-900 overflow-y-auto pb-20">
      
      {/* --- HERO PREVIEW (Matches Hero.jsx) --- */}
      <section className="relative bg-slate-900 py-16 px-6 overflow-hidden text-center">
        {/* Particle Simulation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <span className="absolute top-4 left-10 text-white font-serif text-xs italic">∫₀ⁿ f(x)dx</span>
          <span className="absolute top-20 right-10 text-white font-serif text-lg">∑</span>
          <span className="absolute bottom-10 left-1/4 text-white font-serif text-sm">π</span>
          <span className="absolute top-1/2 right-1/4 text-white font-serif text-xs">e=mc²</span>
        </div>

        <div className="relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-medium mb-4">
            {hero.title || "Mathematics Tutor • MSc Mathematics"}
          </span>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            {firstName} <span className="text-blue-500">{lastName}</span>
          </h1>
          <p className="text-xs text-slate-300 mb-6 max-w-[240px] mx-auto leading-relaxed">
            {hero.tagline || "Mastering Mathematics, one step at a time. Clear, interactive lessons."}
          </p>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-full max-w-[160px] py-2 bg-white text-slate-900 text-[11px] font-bold rounded-full shadow-lg flex items-center justify-center gap-2">
              <Play size={12} className="fill-slate-900" /> Watch Tutorials
            </div>
            <div className="w-full max-w-[160px] py-2 bg-blue-600 text-white text-[11px] font-bold rounded-full shadow-lg flex items-center justify-center">
              Contact Me
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT & STATS PREVIEW (Matches About.jsx) --- */}
      <section className="py-10 px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-6">
            {/* Circular Ring Simulation */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="48" stroke="#f1f5f9" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="48" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="300" strokeDashoffset="80" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-md">
              <img src={data.media?.profileImage || "/face.avif"} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-2 -left-2 bg-white px-2 py-1 rounded-lg shadow-sm border border-slate-50 flex items-center gap-1">
              <Award className="text-blue-600" size={10} />
              <span className="text-[8px] font-bold text-slate-800">MSc Math</span>
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-[8px] font-black uppercase tracking-widest rounded-full mb-3">
              Expert Pedagogy
            </span>
            <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight">
              Crafting clarity from <span className="text-blue-600">Mathematical Chaos.</span>
            </h3>
            <p className="text-[11px] text-slate-600 mb-4 italic">
              "Building logical foundations through virtual whiteboards."
            </p>
          </div>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {(stats.length > 0 ? stats : [{label: 'Students', value: '500+', icon: Users}, {label: 'Success Rate', value: '98%', icon: Trophy}]).map((stat, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="text-blue-600 mb-1"><stat.icon size={14} /></div>
              <div className="text-sm font-black text-slate-900">{stat.value}</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Availability Calendar Mini */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-blue-600" size={14} />
            <h4 className="text-[11px] font-black text-slate-900 uppercase">Weekly Schedule</h4>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="text-center text-[8px] font-bold text-slate-400">{d}</div>
            ))}
            {[1,0,1,1,0,1,1].map((active, i) => (
              <div key={i} className={`h-4 rounded-sm ${active ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
            ))}
          </div>
          <p className="text-[9px] text-slate-500 font-medium">
            <Clock size={8} className="inline mr-1 text-blue-500" /> 
            {schedule.timezone || "GMT+5 (PKT)"}: 4 PM - 9 PM
          </p>
        </div>
      </section>

      {/* --- PORTFOLIO PREVIEW (Matches Portfolio.jsx) --- */}
      <section className="bg-slate-50 py-10 px-6">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Latest Lessons</h4>
        <div className="space-y-4">
          {(library.length > 0 ? library.slice(0, 2) : [
            { title: "IGCSE Math: 2025 Walkthrough", category: "Cambridge" },
            { title: "The Art of Rationalizing Surds", category: "Class 9" }
          ]).map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <div className="aspect-video bg-slate-200 relative flex items-center justify-center">
                <Youtube className="text-white opacity-50" size={24} />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[8px] px-1 rounded">12:45</div>
              </div>
              <div className="p-3">
                <div className="text-[8px] font-bold text-blue-600 uppercase mb-1">{item.category}</div>
                <div className="text-[10px] font-bold text-slate-900 leading-tight">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS PREVIEW (Matches Testimonials.jsx) --- */}
      <section className="py-10 px-6">
        <div className="bg-blue-600 rounded-2xl p-4 text-white">
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
          </div>
          <p className="text-[10px] italic mb-3 opacity-90 leading-relaxed">
            "{testimonials[0]?.text || "The way Moazzam explains complex calculus makes it feel like simple addition. Highly recommended!"}"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-400"></div>
            <div>
              <div className="text-[9px] font-bold">{testimonials[0]?.author || "Ahmed Khan"}</div>
              <div className="text-[7px] opacity-70">A-Level Student</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT PREVIEW (Matches Contact.jsx) --- */}
      <section className="py-10 px-6 text-center">
        <h3 className="text-lg font-black text-slate-900 mb-2">Ready to level up?</h3>
        <p className="text-[10px] text-slate-500 mb-6">Join 500+ students mastering math today.</p>
        <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-xl">
           <div className="flex items-center gap-2 mb-3 py-2 px-3 bg-slate-50 rounded-lg text-left">
             <MessageCircle size={14} className="text-blue-600" />
             <span className="text-[10px] text-slate-400">Type your question...</span>
           </div>
           <button className="w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2">
             Book Free Trial <ArrowRight size={14} />
           </button>
        </div>
      </section>

    </div>
  );
}

export default PreviewPanel;