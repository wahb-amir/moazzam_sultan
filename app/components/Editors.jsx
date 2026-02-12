import {
  Plus,
  Trash2,
  Video,
  Star,
  MessageSquare,
  Hash,
  User,
  Type,
  Globe,
  Mail,
  Phone,
  Layers,
} from "lucide-react";
import { Input, TextArea, Button, Card } from "./Ui";
import React from "react";

/* Small helpers ----------------------------------------------------------- */
function deepClone(v) {
  try {
    return JSON.parse(JSON.stringify(v));
  } catch {
    return typeof structuredClone === "function" ? structuredClone(v) : v;
  }
}

// set nested path like 'hero.primaryAction.text'
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

/* HERO SECTION ----------------------------------------------------------- */
export function HeroEditor({ draft, onChange }) {
  if (!draft?.hero) return null;

  const update = (path, val) => {
    onChange(setDeep(draft, `hero.${path}`, val));
  };

  const updateRoot = (path, val) => {
    onChange(setDeep(draft, path, val));
  };

  return (
    <Card title={<span className="text-black">Hero Branding</span>}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={<span className="text-black">Full Name</span>}
            icon={<User size={14} />}
            className="text-black"
            value={draft.hero.name || ""}
            onChange={(e) => update("name", e.target.value)}
          />
          <Input
            label={<span className="text-black">Professional Title</span>}
            icon={<Type size={14} />}
            className="text-black"
            value={draft.hero.title || ""}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <TextArea
          label={<span className="text-black">Tagline / Hook</span>}
          placeholder="e.g. Mastering Mathematics, one step at a time."
          className="text-black"
          value={draft.hero.tagline || ""}
          onChange={(e) => update("tagline", e.target.value)}
        />

        <Input
          label={<span className="text-black">Subtitle (optional)</span>}
          value={draft.hero.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
        />

        <TextArea
          label={<span className="text-black">Description (hero)</span>}
          rows={3}
          value={draft.hero.description || ""}
          onChange={(e) => update("description", e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={<span className="text-black">Primary action text</span>}
            value={draft.hero.primaryAction?.text || ""}
            onChange={(e) => update("primaryAction.text", e.target.value)}
          />
          <Input
            label={<span className="text-black">Primary action href</span>}
            value={draft.hero.primaryAction?.href || ""}
            onChange={(e) => update("primaryAction.href", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={<span className="text-black">Secondary action text</span>}
            value={draft.hero.secondaryAction?.text || ""}
            onChange={(e) => update("secondaryAction.text", e.target.value)}
          />
          <Input
            label={<span className="text-black">Secondary action href</span>}
            value={draft.hero.secondaryAction?.href || ""}
            onChange={(e) => update("secondaryAction.href", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={<span className="text-black">Hero video URL</span>}
            value={draft.hero.video || ""}
            onChange={(e) => update("video", e.target.value)}
          />
          <Input
            label={
              <span className="text-black">
                Particle symbols (comma separated)
              </span>
            }
            value={
              (draft.hero.particleSymbols || []).join?.(",") ||
              draft.hero.particleSymbols ||
              ""
            }
            onChange={(e) =>
              update(
                "particleSymbols",
                typeof draft.hero.particleSymbols === "string"
                  ? e.target.value
                  : (e.target.value || "").split(",").map((s) => s.trim()),
              )
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={<span className="text-black">Badge text</span>}
            value={draft.hero.badgeText || draft.hero.badge?.text || ""}
            onChange={(e) => {
              // support both shapes (hero.badge or hero.badgeText)
              if (draft.hero.badge) {
                onChange(setDeep(draft, "hero.badge.text", e.target.value));
              } else {
                update("badgeText", e.target.value);
              }
            }}
          />
          <Input
            label={
              <span className="text-black">Badge icon name (e.g. Award)</span>
            }
            value={draft.hero.badge?.icon || draft.hero.badgeIcon || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (draft.hero.badge) {
                onChange(setDeep(draft, "hero.badge.icon", val));
              } else {
                update("badgeIcon", val);
              }
            }}
            placeholder="Leave blank to use default component"
          />
        </div>
      </div>
    </Card>
  );
}

/* ABOUT SECTION ---------------------------------------------------------- */
export function AboutEditor({ draft, onChange }) {
  if (!draft?.about) return null;

  const update = (path, val) => {
    onChange(setDeep(draft, `about.${path}`, val));
  };

  const updateRoot = (path, val) => {
    onChange(setDeep(draft, path, val));
  };

  const addSpecialty = () => {
    const specialties = [
      ...(draft.about.specialties || []),
      { name: "", topic: "" },
    ];
    onChange({
      ...deepClone(draft),
      about: { ...deepClone(draft.about), specialties },
    });
  };

  const removeSpecialty = (index) => {
    const specialties = (draft.about.specialties || []).filter(
      (_, i) => i !== index,
    );
    onChange({
      ...deepClone(draft),
      about: { ...deepClone(draft.about), specialties },
    });
  };

  const addTag = () => {
    const tags = [...(draft.about.tags || []), ""];
    onChange({
      ...deepClone(draft),
      about: { ...deepClone(draft.about), tags },
    });
  };

  const removeTag = (i) => {
    const tags = (draft.about.tags || []).filter((_, idx) => idx !== i);
    onChange({
      ...deepClone(draft),
      about: { ...deepClone(draft.about), tags },
    });
  };

  return (
    <Card title={<span className="text-black">Expertise & Biography</span>}>
      <div className="space-y-6">
        <Input
          label={<span className="text-black">Headline</span>}
          className="text-black"
          value={draft.about.headline || ""}
          onChange={(e) => update("headline", e.target.value)}
        />

        <Input
          label={<span className="text-black">Subheadline</span>}
          className="text-black"
          value={draft.about.subheadline || ""}
          onChange={(e) => update("subheadline", e.target.value)}
        />

        <TextArea
          label={<span className="text-black">Bio / Detailed Description</span>}
          rows={5}
          className="text-black"
          value={draft.about.description || ""}
          onChange={(e) => update("description", e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label={<span className="text-black">Portrait src</span>}
            value={draft.about.portrait?.src || ""}
            onChange={(e) => update("portrait.src", e.target.value)}
          />
          <Input
            label={<span className="text-black">Portrait alt</span>}
            value={draft.about.portrait?.alt || ""}
            onChange={(e) => update("portrait.alt", e.target.value)}
          />
          <Input
            label={<span className="text-black">Resume href</span>}
            value={draft.about.resumeAction?.href || draft.resume || ""}
            onChange={(e) => {
              if (draft.about.resumeAction) {
                onChange(
                  setDeep(draft, "about.resumeAction.href", e.target.value),
                );
              } else {
                updateRoot("resume", e.target.value);
              }
            }}
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-black uppercase text-black flex items-center gap-2">
              <Layers size={14} /> Key Specialties
            </label>
            <Button variant="outline" size="sm" onClick={addSpecialty}>
              <Plus size={14} className="mr-1" /> Add
            </Button>
          </div>

          <div className="space-y-3">
            {draft.about.specialties?.map((s, i) => (
              <div
                key={i}
                className="flex gap-3 items-end bg-slate-50 p-3 rounded-xl border border-slate-100"
              >
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Level (e.g. A-Level)"
                    className="text-black"
                    value={s.name}
                    onChange={(e) => {
                      const specs = [...(draft.about.specialties || [])];
                      specs[i] = { ...(specs[i] || {}), name: e.target.value };
                      onChange({
                        ...deepClone(draft),
                        about: {
                          ...deepClone(draft.about),
                          specialties: specs,
                        },
                      });
                    }}
                  />
                  <Input
                    placeholder="Subject/Topic"
                    className="text-black"
                    value={s.topic}
                    onChange={(e) => {
                      const specs = [...(draft.about.specialties || [])];
                      specs[i] = { ...(specs[i] || {}), topic: e.target.value };
                      onChange({
                        ...deepClone(draft),
                        about: {
                          ...deepClone(draft.about),
                          specialties: specs,
                        },
                      });
                    }}
                  />
                </div>
                <button
                  onClick={() => removeSpecialty(i)}
                  className="p-2.5 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-black uppercase text-black flex items-center gap-2">
              <Star size={14} /> Tags
            </label>
            <Button variant="outline" size="sm" onClick={addTag}>
              <Plus size={14} className="mr-1" /> Add
            </Button>
          </div>

          <div className="space-y-3">
            {(draft.about.tags || []).map((t, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Input
                  value={t}
                  onChange={(e) => {
                    const tags = [...(draft.about.tags || [])];
                    tags[i] = e.target.value;
                    onChange({
                      ...deepClone(draft),
                      about: { ...deepClone(draft.about), tags },
                    });
                  }}
                />
                <button
                  onClick={() => removeTag(i)}
                  className="p-2.5 text-slate-300 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* SCHEDULE SECTION ------------------------------------------------------- */
export function ScheduleEditor({ draft, onChange }) {
  if (!draft?.schedule) return null;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [16, 17, 18, 19, 20, 21];

  const toggleSlot = (day, hour) => {
    const nextDraft = deepClone(draft);
    if (!nextDraft.schedule.slots) nextDraft.schedule.slots = {};
    if (!nextDraft.schedule.slots[day]) nextDraft.schedule.slots[day] = {};
    const current = nextDraft.schedule.slots[day][hour];
    nextDraft.schedule.slots[day][hour] = current === "BOOK" ? "-" : "BOOK";
    onChange(nextDraft);
  };

  const update = (path, val) => {
    onChange(setDeep(draft, `schedule.${path}`, val));
  };

  return (
    <Card title={<span className="text-black">Availability Grid</span>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label={<span className="text-black">Timezone</span>}
          icon={<Globe size={14} />}
          className="text-black"
          value={draft.schedule.timeZone || ""}
          onChange={(e) => update("timeZone", e.target.value)}
        />
        <Input
          label={<span className="text-black">Current Status Note</span>}
          className="text-black"
          value={draft.schedule.status || ""}
          onChange={(e) => update("status", e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-3 text-[10px] font-black uppercase text-black">
                Day
              </th>
              {hours.map((h) => (
                <th
                  key={h}
                  className="p-3 text-center text-[10px] font-black uppercase text-black"
                >
                  {h}:00
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {days.map((day) => (
              <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 font-bold text-black text-xs">{day}</td>
                {hours.map((h) => {
                  const isBooked = draft.schedule.slots?.[day]?.[h] === "BOOK";
                  return (
                    <td key={h} className="p-1.5 text-center">
                      <button
                        onClick={() => toggleSlot(day, h)}
                        className={`w-full h-8 rounded-lg transition-all border ${
                          isBooked
                            ? "bg-blue-600 border-blue-700 shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                        title={isBooked ? "Booked" : "Free"}
                      >
                        {isBooked ? "BOOK" : "—"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* LIBRARY SECTION -------------------------------------------------------- */
export function LibraryEditor({ draft, onChange }) {
  // support draft.library or draft.portfolioItems as a source of items
  const sourceKey = draft?.library
    ? "library"
    : draft?.portfolioItems
      ? "portfolioItems"
      : "library";
  if (!draft?.[sourceKey]) return null;

  const addVideo = () => {
    const items = [
      ...(draft[sourceKey] || []),
      { title: "", category: "", videoId: "" },
    ];
    onChange({ ...deepClone(draft), [sourceKey]: items });
  };

  const removeVideo = (index) => {
    const items = (draft[sourceKey] || []).filter((_, i) => i !== index);
    onChange({ ...deepClone(draft), [sourceKey]: items });
  };

  const updateVideo = (i, field, val) => {
    const items = deepClone(draft[sourceKey] || []);
    items[i] = { ...(items[i] || {}), [field]: val };
    onChange({ ...deepClone(draft), [sourceKey]: items });
  };

  return (
    <Card title={<span className="text-black">Video Library</span>}>
      <div className="space-y-4">
        {(draft[sourceKey] || []).map((item, i) => (
          <div
            key={i}
            className="group relative p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-md transition-all"
          >
            <button
              onClick={() => removeVideo(i)}
              className="absolute -top-2 -right-2 bg-white border shadow-sm text-slate-400 hover:text-red-500 p-1.5 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Input
                  placeholder="Lesson Title"
                  icon={<Video size={14} />}
                  className="text-black font-bold"
                  value={item.title || ""}
                  onChange={(e) => updateVideo(i, "title", e.target.value)}
                />
              </div>
              <Input
                placeholder="Level / Category"
                className="text-black"
                value={item.category || ""}
                onChange={(e) => updateVideo(i, "category", e.target.value)}
              />
              <Input
                placeholder="YouTube Video ID"
                icon={<Hash size={14} />}
                className="text-black"
                value={item.videoId || ""}
                onChange={(e) => updateVideo(i, "videoId", e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={addVideo}
          className="w-full py-4 border-dashed bg-transparent border-2 text-black"
        >
          <Plus size={16} className="mr-2" /> Add New Lesson
        </Button>
      </div>
    </Card>
  );
}

/* CONTACT & SOCIALS ------------------------------------------------------ */
export function ContactEditor({ draft, onChange }) {
  if (!draft?.contact && !draft?.socialLinks) {
    // initialize contact if missing
    const init = {
      contact: {
        ctaHeadline: "",
        ctaDescription: "",
        contacts: { whatsapp: "", email: "" },
      },
    };
    onChange({ ...deepClone(draft), ...init });
    return null;
  }

  const updateContact = (key, val) => {
    const next = deepClone(draft);
    next.contact = next.contact || { contacts: {} };
    next.contact.contacts = next.contact.contacts || {};
    next.contact.contacts[key] = val;
    onChange(next);
  };

  const updateContactRoot = (path, val) => {
    onChange(setDeep(draft, `contact.${path}`, val));
  };

  const updateSocial = (key, val) => {
    onChange(setDeep(draft, `socialLinks.${key}`, val));
  };

  return (
    <Card title={<span className="text-black">Contact Channels</span>}>
      <div className="space-y-4">
        <Input
          label={<span className="text-black">Call to Action Headline</span>}
          className="text-black"
          value={draft.contact?.ctaHeadline || draft.contact?.cta || ""}
          onChange={(e) => updateContactRoot("ctaHeadline", e.target.value)}
        />
        <TextArea
          label={<span className="text-black">CTA Description</span>}
          rows={3}
          className="text-black"
          value={draft.contact?.ctaDescription || ""}
          onChange={(e) => updateContactRoot("ctaDescription", e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={<span className="text-black">WhatsApp</span>}
            icon={<Phone size={14} />}
            className="text-black"
            value={
              draft.contact?.contacts?.whatsapp ||
              draft.socialLinks?.whatsapp ||
              ""
            }
            onChange={(e) => updateContact("whatsapp", e.target.value)}
          />
          <Input
            label={<span className="text-black">Email</span>}
            icon={<Mail size={14} />}
            className="text-black"
            value={
              draft.contact?.contacts?.email || draft.socialLinks?.email || ""
            }
            onChange={(e) => updateContact("email", e.target.value)}
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-sm font-bold mb-2">Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              value={draft.socialLinks?.youtube || ""}
              onChange={(e) => updateSocial("youtube", e.target.value)}
              placeholder="YouTube URL"
            />
            <Input
              value={draft.socialLinks?.whatsapp || ""}
              onChange={(e) => updateSocial("whatsapp", e.target.value)}
              placeholder="WhatsApp URL or number"
            />
            <Input
              value={draft.socialLinks?.twitter || ""}
              onChange={(e) => updateSocial("twitter", e.target.value)}
              placeholder="Twitter / X URL"
            />
            <Input
              value={draft.socialLinks?.github || ""}
              onChange={(e) => updateSocial("github", e.target.value)}
              placeholder="GitHub URL"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
// safe StatsEditor — paste this over your current StatsEditor
export function StatsEditor({ draft, onChange }) {
  // Ensure we never call .map on a non-array
  const statCards = Array.isArray(draft.stats) ? draft.stats : [];

  // If draft.stats is an object (numeric stats), show those values separately
  const numericStats = !Array.isArray(draft.stats) ? (draft.stats || { subscribers: "", views: "" }) : { subscribers: "", views: "" };

  const updateNumber = (key, val) => {
    // If stats was an array, convert to numeric object when user edits numbers
    if (Array.isArray(draft.stats)) {
      const next = { subscribers: "", views: "" };
      next[key] = val;
      onChange(setDeep(draft, "stats", next));
    } else {
      onChange(setDeep(draft, `stats.${key}`, val));
    }
  };

  const editStatCard = (i, field, val) => {
    const cards = Array.isArray(draft.stats) ? deepClone(draft.stats) : [];
    while (cards.length <= i) cards.push({ icon: "", value: "", label: "" });
    cards[i] = { ...(cards[i] || {}), [field]: val };
    onChange(setDeep(draft, "stats", cards));
  };

  const addStatCard = () => {
    const cards = Array.isArray(draft.stats) ? deepClone(draft.stats) : [];
    cards.push({ icon: "", value: "", label: "" });
    onChange(setDeep(draft, "stats", cards));
  };

  const removeStatCard = (i) => {
    if (!Array.isArray(draft.stats)) return;
    const cards = (draft.stats || []).filter((_, idx) => idx !== i);
    onChange(setDeep(draft, "stats", cards));
  };

  return (
    <div>
      {/* Numeric stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <Input
            label={<span className="text-black">YouTube Subs</span>}
            className="text-black"
            value={String(numericStats.subscribers ?? "")}
            onChange={(e) => updateNumber("subscribers", e.target.value)}
          />
        </Card>
        <Card>
          <Input
            label={<span className="text-black">Total Views</span>}
            className="text-black"
            value={String(numericStats.views ?? "")}
            onChange={(e) => updateNumber("views", e.target.value)}
          />
        </Card>
      </div>

      {/* Stat cards (array) */}
      <div className="mt-4">
        <Card title={<span className="text-black">Stat Cards</span>}>
          <div className="space-y-3">
            {(statCards || []).map((card, i) => (
              <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl">
                <Input
                  value={card.icon || ""}
                  placeholder="Icon name (e.g. Award)"
                  onChange={(e) => editStatCard(i, "icon", e.target.value)}
                />
                <Input
                  value={card.value || ""}
                  placeholder="Value"
                  onChange={(e) => editStatCard(i, "value", e.target.value)}
                />
                <Input
                  value={card.label || ""}
                  placeholder="Label"
                  onChange={(e) => editStatCard(i, "label", e.target.value)}
                />
                <button onClick={() => removeStatCard(i)} className="p-2 text-slate-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <Button variant="outline" onClick={addStatCard}>
              <Plus size={14} className="mr-1" />Add Stat Card
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
/* STATS EDITOR ----------------------------------------------------------- */
