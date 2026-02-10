"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  Command, 
  Cpu, 
  Fingerprint, 
  Hexagon 
} from "lucide-react";
import Navbar from "../components/Navbar"
export default function ProfessionalLogin() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
      <Navbar/>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* The "Origin" lines */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-500/10"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/10"></div>
        
        {/* Decorative Sine Wave (CSS SVG) */}
        <svg className="absolute bottom-0 left-0 w-full h-96 opacity-[0.03] text-blue-700" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* --- LAYER 2: THE LOGIN INTERFACE --- */}
      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 sm:p-10 relative overflow-hidden group">
          
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-80"></div>

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-6 border border-blue-100 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
              <Hexagon strokeWidth={1.5} size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Portfolio
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Identify yourself to access the control plane.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Input 1: Identity */}
            <div className="group/input">
              <label className="block text-xs font-mono font-medium text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                User Identity
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-blue-500 transition-colors">
                  <Command size={16} />
                </div>
                <input 
                  type="email"
                  required
                  placeholder="admin@system.local"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Input 2: Key */}
            <div className="group/input">
              <label className="block text-xs font-mono font-medium text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Secure Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-blue-500 transition-colors">
                  <Fingerprint size={16} />
                </div>
                <input 
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Action */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-2 relative overflow-hidden bg-slate-900 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 group/btn"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Cpu className="animate-spin" size={18} />
                    <span className="text-sm">Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Initialize Session</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              {/* Button Progress Bar Effect on Load */}
              {loading && (
                <div className="absolute inset-0 bg-blue-600 origin-left animate-[loading_2s_ease-in-out_infinite]" />
              )}
            </button>
          </form>

          {/* Footer Meta */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            {/* <div className="flex gap-2 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              <span>Ver 2.0.4</span>
              <span className="text-slate-300">|</span>
              <span>Secure</span>
            </div>
            <a href="#" className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">
              Recover Access?
            </a> */}
          </div>

        </div>
        
        {/* Floating Abstract Element */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20"></div>

      </div>
    </div>
  );
}