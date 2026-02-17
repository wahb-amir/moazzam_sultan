// // src/App.jsx
// "use client";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Portfolio from "./components/Portfolio";
// import Testimonials from "./components/Testimonials";
// import Contact from "./components/Contact";
// import DATA from "@/data.json";
// import Footer from "./components/Footer";
// const App = () => {
//   return (
//     <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
//       <Navbar />
//       <Hero
//         badgeText={DATA.hero.badgeText}
//         title={DATA.hero.title}
//         subtitle={DATA.hero.subtitle}
//         description={DATA.hero.description}
//         primaryAction={DATA.hero.primaryAction}
//         secondaryAction={DATA.hero.secondaryAction}
//         video={DATA.hero.video}
//       />

//       <About
//         intro={DATA.about.intro}
//         copy={DATA.about.copy}
//         portrait={DATA.about.portrait}
//         availability={DATA.about.availability}
//         primaryAction={DATA.about.primaryAction}
//         resumeAction={DATA.about.resumeAction}
//         stats={DATA.about.stats}
//       />

//       <Portfolio
//         items={DATA.portfolioItems}
//         channelUrl={DATA.socialLinks.youtube}
//       />
//       <Testimonials testimonials={DATA.testimonials} />
//       <Contact socialLinks={DATA.socialLinks} />
//       <Footer  />
//     </div>
//   );
// };

// export default App;
import React from 'react';
import { Lock, CreditCard, AlertTriangle } from 'lucide-react';


export default function UnpaidInvoicePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration to look 'professional' */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl max-w-lg w-full p-8 border border-white/20 text-center">
        
        {/* Header Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6 animate-pulse">
          <Lock className="h-8 w-8 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          Deployment Suspended
        </h1>
        
        <p className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-widest">
          Error Code: 402_PAYMENT_REQUIRED
        </p>

        {/* The "Fun" but Direct Message */}
        <div className="space-y-4 text-gray-600 mb-8">
          <p className="text-lg font-bold">
           This application is currently in “Hibernation Mode”… our devs went unpaid and the coffee ran out. ☕💤
          </p>
          <div className="flex flex-col items-center justify-center mt-6 space-y-2 relative">
  {/* Coffee cup SVG */}
  <svg className="w-16 h-16 animate-bounce-slow" viewBox="0 0 64 64" fill="none">
    <rect x="18" y="24" width="28" height="24" rx="4" fill="#C27856"/>
    <path d="M46 28h4a4 4 0 0 1 0 8h-4" stroke="#8B5E3C" strokeWidth="2"/>
    <path d="M28 20c0-4 8-4 8 0" stroke="#F3E5AB" strokeWidth="2" strokeLinecap="round"/>
  </svg>

  {/* Speech bubble */}
  <div className="relative bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg text-center text-gray-800 font-medium animate-pulse">
    We love building great software… ☕  
    <br />but food, shelter & coffee are kinda important 😅
    {/* Small confetti around bubble */}
    <span className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-bounce-slow"></span>
    <span className="absolute top-0 right-0 w-2 h-2 bg-pink-400 rounded-full animate-bounce-slow delay-200"></span>
    <span className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce-slow delay-400"></span>
  </div>
</div>
          {/* <p>
            We love building great software, but our developers also enjoy things like food, shelter, and coffee.
          </p> */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">System Note:</span> The "Un-blur Website" feature is automatically triggered upon receipt of payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Action Buttons */}
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <a 
    href="https://api.whatsapp.com/send/?phone=923004907243&text=Hi! I would like to settle the outstanding balance for the website deployment.&type=phone_number&app_absent=0"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-500/30 cursor-pointer no-underline"
  >
    <CreditCard className="mr-2 h-5 w-5" />
    Contact Developer to Pay
  </a>
</div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400">
          ID: MISSING_INVOICE_#001 • Timestamp: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}