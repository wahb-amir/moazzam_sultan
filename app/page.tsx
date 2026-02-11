// src/App.jsx
"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import DATA from "@/data.json";

const App = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero
        badgeText={DATA.hero.badgeText}
        title={DATA.hero.title}
        subtitle={DATA.hero.subtitle}
        description={DATA.hero.description}
        primaryAction={DATA.hero.primaryAction}
        secondaryAction={DATA.hero.secondaryAction}
        video={DATA.hero.video}
      />

      <About
        intro={DATA.about.intro}
        copy={DATA.about.copy}
        portrait={DATA.about.portrait}
        availability={DATA.about.availability}
        primaryAction={DATA.about.primaryAction}
        resumeAction={DATA.about.resumeAction}
        stats={DATA.about.stats}
      />

      <Portfolio
        items={DATA.portfolioItems}
        channelUrl={DATA.socialLinks.youtube}
      />
      <Testimonials testimonials={DATA.testimonials} />
      <Contact socialLinks={DATA.socialLinks} />
    </div>
  );
};

export default App;
