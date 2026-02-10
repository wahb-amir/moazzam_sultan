"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../providers/AuthProvider";
import {
  Loader2,
  Layout,
  Users,
  Calendar,
  Library,
  MessageSquare,
  Smartphone,
  Globe,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Undo2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import PreviewPanel from "../components/Preview";
import {
  HeroEditor,
  AboutEditor,
  ScheduleEditor,
  LibraryEditor,
  TestimonialsEditor,
  ContactEditor,
  StatsEditor,
} from "../components/Editors";
import { Button, Card, SectionHeader } from "../components/Ui";

function getEmptyDraft() {
  return {
    hero: {
      title: "Mathematics Tutor • MSc Mathematics",
      name: "Moazzam Sultan",
      tagline: "Mastering Mathematics, one step at a time.",
      cta: [
        { label: "Watch Tutorials", link: "https://youtube.com" },
        { label: "Contact Me", link: "#contact" },
      ],
    },
    about: {
      headline: "Expert Mathematics Pedagogy",
      subheadline: "Crafting clarity from Mathematical Chaos.",
      description: "As a Master’s degree holder with specialized experience...",
      specialties: [
        { name: "O/A Levels", topic: "Calculus" },
      ],
    },
    schedule: {
      timeZone: "GMT+5 (PKT)",
      status: "Currently at near-full capacity.",
      slots: generateDefaultSlots(),
    },
    stats: {
      subscribers: 0,
      views: 0,
    },
    library: [],
    testimonials: [],
    contact: {
      ctaHeadline: "Ready to Master Mathematics?",
      ctaDescription: "Reach out and let’s make Math your favorite subject.",
      contacts: {
        whatsapp: "",
        email: "",
      },
    },
    media: { profileImage: "", heroImage: "" },
  };
}

/**
 * Generates the empty grid for the availability calendar
 */
function generateDefaultSlots() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = [16, 17, 18, 19, 20, 21];
  const slots = {};
  days.forEach((d) => {
    slots[d] = {};
    times.forEach((t) => (slots[d][t] = "-"));
  });
  return slots;
}
export default function Dashboard() {
  const {user}=useAuth()
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(getEmptyDraft());
  const [versions, setVersions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState([]);
  const router= useRouter()
  const saveRef = useRef(null);
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );;
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/portfolio/draft");
        const json = await res.json();
        setDraft(json.data || getEmptyDraft());
        const vRes = await fetch("/api/portfolio/versions");
        const vJson = await vRes.json();
        setVersions(vJson.versions || []);
      } catch (e) {
        setDraft(getEmptyDraft());
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // INSTANT UPDATE LOGIC
  const handleUpdate = (newDraft) => {
    setDraft(newDraft); // This triggers the PreviewPanel instantly

    // Debounced Save to Database
    setSaving(true);
    if (saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(async () => {
      try {
        await fetch("/api/portfolio", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: newDraft }),
        });
      } finally {
        setSaving(false);
      }
    }, 1000);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold">
            MS
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            {saving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" /> Syncing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3" /> Up to date
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open("/preview", "_blank")}
          >
            <ExternalLink size={16} /> Preview
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              /* Publish Logic */
            }}
          >
            Publish Site
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* EDITORS COLUMN */}
        <div className="lg:col-span-7 space-y-8">
          <SectionHeader icon={<Layout />} title="Hero" />
          <HeroEditor draft={draft} onChange={handleUpdate} />

          <SectionHeader icon={<Users />} title="About Me" />
          <AboutEditor draft={draft} onChange={handleUpdate} />

          <SectionHeader icon={<Calendar />} title="Schedule" />
          <ScheduleEditor draft={draft} onChange={handleUpdate} />

          <SectionHeader icon={<Library />} title="Portfolio" />
          <LibraryEditor draft={draft} onChange={handleUpdate} />
        </div>

        {/* STICKY PREVIEW COLUMN */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-3xl border-8 border-slate-900 shadow-2xl overflow-hidden h-[700px] bg-white relative">
              <div className="absolute top-0 w-full h-6 bg-slate-900 flex justify-center items-center">
                <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
              </div>
              <div className="h-full overflow-y-auto pt-6 custom-scrollbar">
                <PreviewPanel data={draft} />
              </div>
            </div>
            <Card title="Analytics Overview">
              <StatsEditor draft={draft} onChange={handleUpdate} />
            </Card>
          </div>
        </aside>
      </main>
    </div>
  );
}
