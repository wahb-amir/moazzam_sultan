// src/App.jsx
'use client'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from "./components/Contact"

const App = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default App;
