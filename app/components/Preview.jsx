"use client";

import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

/**
 * Helpers
 */
function deepClone(v) {
  try {
    return JSON.parse(JSON.stringify(v));
  } catch {
    return typeof structuredClone === "function" ? structuredClone(v) : v;
  }
}

function setDeep(obj, path, value) {
  const keys = Array.isArray(path) ? path : String(path).split(".");
  const next = deepClone(obj || {});
  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cur[k] === undefined || cur[k] === null) cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return next;
}

function normalizeData(d) {
  const copy = deepClone(d || {});
  // ensure top-level objects exist
  copy.about = copy.about || {};
  copy.socialLinks = copy.socialLinks || copy.socials || {};
  copy.portfolioItems = Array.isArray(copy.portfolioItems)
    ? copy.portfolioItems
    : Array.isArray(copy.library)
    ? copy.library
    : Array.isArray(copy.items)
    ? copy.items
    : [];
  copy.testimonials = Array.isArray(copy.testimonials)
    ? copy.testimonials
    : Array.isArray(copy.reviews)
    ? copy.reviews
    : [];
  // ensure arrays where expected
  copy.about.stats = Array.isArray(copy.about.stats)
    ? copy.about.stats
    : Array.isArray(copy.stats)
    ? copy.stats
    : [];
  return copy;
}

export default function PreviewPanel({ data, onChange }) {
  const [draft, setDraft] = useState(() => (data ? normalizeData(data) : {}));
  const [panelOpen, setPanelOpen] = useState(true);

  // sync incoming data -> draft (normalized)
  useEffect(() => {
    if (data) setDraft(normalizeData(data));
  }, [data]);

  // push change locally and optionally notify parent live
  const pushChange = useCallback(
    (next, { notify = true } = {}) => {
      setDraft(next);
      if (notify && typeof onChange === "function") onChange(deepClone(next));
    },
    [onChange]
  );

  // generic updater for nested fields
  const updateField = useCallback(
    (path, value, opts) => {
      const next = setDeep(draft, path, value);
      pushChange(next, opts);
    },
    [draft, pushChange]
  );

  // helpers for array items (safe)
  const updateArrayItem = useCallback(
    (arrayPath, index, key, value) => {
      // safely navigate to existing value at path
      const existing = arrayPath
        .split(".")
        .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), draft);

      const arr = Array.isArray(existing) ? [...existing] : [];
      // ensure array is long enough
      while (arr.length <= index) arr.push({});
      arr[index] = { ...(arr[index] || {}), [key]: value };
      const next = setDeep(draft, arrayPath, arr);
      pushChange(next);
    },
    [draft, pushChange]
  );

  const resetToSource = () => {
    if (data) {
      const normalized = normalizeData(data);
      setDraft(normalized);
      if (typeof onChange === "function") onChange(deepClone(normalized));
    }
  };

  if (!draft) return null;

  // Provide safe accessors / defaults for components
  const socials = draft.socialLinks || draft.socials || {};
  const heroProps = {
    badgeText: draft.hero?.badgeText ?? draft.hero?.title ?? undefined,
    title:
      draft.hero?.title && typeof draft.hero.title === "object"
        ? draft.hero.title
        : (() => {
            if (typeof draft.hero?.name === "string") {
              const parts = draft.hero.name.split(" ");
              return { pre: parts[0], highlight: parts.slice(1).join(" "), level: 1 };
            }
            return { pre: draft.hero?.pre || "Moazzam", highlight: draft.hero?.highlight || "Sultan", level: 1 };
          })(),
    subtitle: draft.hero?.subtitle ?? draft.hero?.tagline ?? draft.hero?.subtitle,
    description: draft.hero?.description,
    primaryAction: draft.hero?.primaryAction,
    secondaryAction: draft.hero?.secondaryAction,
    video: draft.hero?.video,
    particleSymbols: draft.hero?.particleSymbols,
    particleCount: draft.hero?.particleCount,
    className: draft.hero?.className,
  };

  const aboutProps = {
    intro: draft.about?.intro ?? draft.about?.heading ?? {},
    copy: draft.about?.copy ?? draft.about?.content ?? {},
    portrait: draft.about?.portrait ?? {},
    primaryAction: draft.about?.primaryAction ?? draft.about?.cta ?? {},
    resumeAction: draft.about?.resumeAction ?? { text: "Resume", href: draft.resume || "/resume.pdf" },
    availability: draft.about?.availability ?? draft.schedule ?? {},
    stats: draft.about?.stats ?? draft.stats ?? [],
    socials,
    statStyles: draft.about?.statStyles,
    containerClassName: draft.about?.containerClassName,
  };

  const portfolioItems = draft.portfolioItems || draft.library || draft.items || [];

  const testimonials = draft.testimonials || draft.reviews || [];

  const contactProps = {
    socialLinks: socials,
    apiEndpoint: draft.contact?.apiEndpoint || "/api/contact",
    contactCards: draft.contact?.cards || null,
    initialFormState: draft.contact?.initialFormState || { name: "", email: "", message: "" },
    characterLimit: draft.contact?.characterLimit ?? 500,
  };

  // --- SAFE derived values used in JSX (must be declared before return) ---
  const statsPreview = Array.isArray(draft?.about?.stats)
    ? draft.about.stats
    : Array.isArray(draft?.stats)
    ? draft.stats
    : [{ label: "Students", value: "500+" }];

  // layout
  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar (mirror production) */}
      <Navbar socials={socials} />

      {/* Main preview content using real components */}
      <main className="flex-1">
        <Hero {...heroProps} socials={socials} />
        <About {...aboutProps} />
        <Portfolio items={portfolioItems} channelUrl={socials.youtube} />
        <Testimonials testimonials={testimonials} />
        <Contact {...contactProps} />
      </main>

      {/* CMS panel */}
      <aside
        className={`fixed top-6 right-6 w-[360px] max-w-[92vw] z-50 transition-transform ${
          panelOpen ? "translate-y-0" : "translate-y-[-10vh]"
        }`}
      >
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-4">
          
          
        </div>
      </aside>
    </div>
  );
}

PreviewPanel.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
};
