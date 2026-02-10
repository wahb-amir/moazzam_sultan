"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from '../providers/AuthProvider'
import { 
  ArrowRight, 
  Command, 
  Cpu, 
  Fingerprint, 
  Hexagon,
  AlertCircle 
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function ProfessionalLogin() {
  const router = useRouter();
  const { setUser,syncUser } = useAuth();
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to generate a simple device fingerprint 
  // (In production, consider using @fingerprintjs/fingerprintjs)
  const getFingerprint = () => {
    return btoa(navigator.userAgent + navigator.language + window.screen.colorDepth);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          fingerprint: getFingerprint() 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        await syncUser()
        router.push("/admin/dashboard");
      } else {
        // Handle specific security challenges
        if (response.status === 403) {
          setError("New location detected. Please check your email for a Magic Link.");
        } else {
          setError(data.error || "Invalid credentials. Access denied.");
        }
      }
    } catch (err) {
      setError("System connection failure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
      <Navbar />
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-500/10"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/10"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="backdrop-blur-xl bg-white/80 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 sm:p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-80"></div>

          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-6 border border-blue-100 shadow-sm">
              <Hexagon strokeWidth={1.5} size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Portfolio CMS</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Access the control plane.</p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={18} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@system.local"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

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
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center border-t border-slate-100 pt-6">
             <button 
               type="button"
               onClick={() => router.push('/admin/magic-link')}
               className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
             >
              Use Magic Link instead?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}