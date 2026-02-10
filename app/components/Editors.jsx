import { 
  Plus, Trash2, Video, Star, 
  MessageSquare, Hash, User, 
  Type, Globe, Mail, Phone,
  Layers
} from "lucide-react";
import { Input, TextArea, Button, Card } from "./Ui";

/**
 * HERO SECTION
 */
export function HeroEditor({ draft, onChange }) {
  if (!draft?.hero) return null;

  const update = (field, val) => {
    onChange({ ...draft, hero: { ...draft.hero, [field]: val } });
  };

  return (
    <Card title={<span className="text-black">Hero Branding</span>}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label={<span className="text-black">Full Name</span>} 
            icon={<User size={14}/>}
            className="text-black"
            value={draft.hero.name || ""} 
            onChange={(e) => update("name", e.target.value)} 
          />
          <Input 
            label={<span className="text-black">Professional Title</span>} 
            icon={<Type size={14}/>}
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
      </div>
    </Card>
  );
}

/**
 * ABOUT SECTION
 */
export function AboutEditor({ draft, onChange }) {
  if (!draft?.about) return null;

  const update = (field, val) => {
    onChange({ ...draft, about: { ...draft.about, [field]: val } });
  };

  const addSpecialty = () => {
    const specialties = [...(draft.about.specialties || []), { name: "", topic: "" }];
    onChange({ ...draft, about: { ...draft.about, specialties } });
  };

  const removeSpecialty = (index) => {
    const specialties = draft.about.specialties.filter((_, i) => i !== index);
    onChange({ ...draft, about: { ...draft.about, specialties } });
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
        <TextArea 
          label={<span className="text-black">Bio / Detailed Description</span>} 
          rows={5} 
          className="text-black"
          value={draft.about.description || ""} 
          onChange={(e) => update("description", e.target.value)} 
        />
        
        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-black uppercase text-black flex items-center gap-2">
              <Layers size={14}/> Key Specialties
            </label>
            <Button variant="outline" size="sm" onClick={addSpecialty}>
              <Plus size={14} className="mr-1"/> Add
            </Button>
          </div>
          
          <div className="space-y-3">
            {draft.about.specialties?.map((s, i) => (
              <div key={i} className="flex gap-3 items-end bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Level (e.g. A-Level)" 
                    className="text-black"
                    value={s.name} 
                    onChange={(e) => {
                      const specs = [...draft.about.specialties]; specs[i].name = e.target.value;
                      onChange({...draft, about: {...draft.about, specialties: specs}});
                    }} 
                  />
                  <Input 
                    placeholder="Subject/Topic" 
                    className="text-black"
                    value={s.topic} 
                    onChange={(e) => {
                      const specs = [...draft.about.specialties]; specs[i].topic = e.target.value;
                      onChange({...draft, about: {...draft.about, specialties: specs}});
                    }} 
                  />
                </div>
                <button onClick={() => removeSpecialty(i)} className="p-2.5 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * SCHEDULE SECTION
 */
export function ScheduleEditor({ draft, onChange }) {
  if (!draft?.schedule) return null;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [16, 17, 18, 19, 20, 21];

  const toggleSlot = (day, hour) => {
    const nextDraft = JSON.parse(JSON.stringify(draft));
    if (!nextDraft.schedule.slots[day]) nextDraft.schedule.slots[day] = {};
    const current = nextDraft.schedule.slots[day][hour];
    nextDraft.schedule.slots[day][hour] = current === "BOOK" ? "-" : "BOOK";
    onChange(nextDraft);
  };

  return (
    <Card title={<span className="text-black">Availability Grid</span>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input 
          label={<span className="text-black">Timezone</span>} 
          icon={<Globe size={14}/>} 
          className="text-black"
          value={draft.schedule.timeZone} 
          onChange={(e) => onChange({...draft, schedule: {...draft.schedule, timeZone: e.target.value}})} 
        />
        <Input 
          label={<span className="text-black">Current Status Note</span>} 
          className="text-black"
          value={draft.schedule.status} 
          onChange={(e) => onChange({...draft, schedule: {...draft.schedule, status: e.target.value}})} 
        />
      </div>
      
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-3 text-[10px] font-black uppercase text-black">Day</th>
              {hours.map(h => <th key={h} className="p-3 text-center text-[10px] font-black uppercase text-black">{h}:00</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {days.map(day => (
              <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 font-bold text-black text-xs">{day}</td>
                {hours.map(h => {
                  const isBooked = draft.schedule.slots?.[day]?.[h] === 'BOOK';
                  return (
                    <td key={h} className="p-1.5 text-center">
                      <button 
                        onClick={() => toggleSlot(day, h)}
                        className={`w-full h-8 rounded-lg transition-all border ${
                          isBooked ? 'bg-blue-600 border-blue-700 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      />
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

/**
 * LIBRARY SECTION
 */
export function LibraryEditor({ draft, onChange }) {
  if (!draft?.library) return null;

  const addVideo = () => {
    const library = [...draft.library, { title: "", category: "", videoId: "" }];
    onChange({ ...draft, library });
  };

  const removeVideo = (index) => {
    const library = draft.library.filter((_, i) => i !== index);
    onChange({ ...draft, library });
  };

  const updateVideo = (i, field, val) => {
    const library = [...draft.library];
    library[i][field] = val;
    onChange({ ...draft, library });
  };

  return (
    <Card title={<span className="text-black">Video Library</span>}>
      <div className="space-y-4">
        {draft.library.map((item, i) => (
          <div key={i} className="group relative p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-md transition-all">
            <button onClick={() => removeVideo(i)} className="absolute -top-2 -right-2 bg-white border shadow-sm text-slate-400 hover:text-red-500 p-1.5 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={14}/>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Input 
                  placeholder="Lesson Title" 
                  icon={<Video size={14}/>} 
                  className="text-black font-bold"
                  value={item.title} 
                  onChange={(e) => updateVideo(i, "title", e.target.value)} 
                />
              </div>
              <Input 
                placeholder="Level / Category" 
                className="text-black"
                value={item.category} 
                onChange={(e) => updateVideo(i, "category", e.target.value)} 
              />
              <Input 
                placeholder="YouTube Video ID" 
                icon={<Hash size={14}/>} 
                className="text-black"
                value={item.videoId} 
                onChange={(e) => updateVideo(i, "videoId", e.target.value)} 
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={addVideo} className="w-full py-4 border-dashed bg-transparent border-2 text-black">
          <Plus size={16} className="mr-2"/> Add New Lesson
        </Button>
      </div>
    </Card>
  );
}

/**
 * CONTACT & STATS SECTION
 */
export function ContactEditor({ draft, onChange }) {
  if (!draft?.contact) return null;

  const updateContact = (key, val) => {
    onChange({
      ...draft,
      contact: {
        ...draft.contact,
        contacts: { ...draft.contact.contacts, [key]: val }
      }
    });
  };

  return (
    <Card title={<span className="text-black">Contact Channels</span>}>
      <div className="space-y-4">
        <Input 
          label={<span className="text-black">Call to Action Headline</span>} 
          className="text-black"
          value={draft.contact.ctaHeadline} 
          onChange={(e) => onChange({...draft, contact: {...draft.contact, ctaHeadline: e.target.value}})} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label={<span className="text-black">WhatsApp Number</span>} 
            icon={<Phone size={14}/>} 
            className="text-black"
            value={draft.contact.contacts?.whatsapp} 
            onChange={(e) => updateContact("whatsapp", e.target.value)} 
          />
          <Input 
            label={<span className="text-black">Business Email</span>} 
            icon={<Mail size={14}/>} 
            className="text-black"
            value={draft.contact.contacts?.email} 
            onChange={(e) => updateContact("email", e.target.value)} 
          />
        </div>
      </div>
    </Card>
  );
}

export function StatsEditor({ draft, onChange }) {
  if (!draft?.stats) return null;

  const update = (field, val) => {
    onChange({ ...draft, stats: { ...draft.stats, [field]: val } });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <Input 
          label={<span className="text-black">YouTube Subs</span>} 
          className="text-black"
          value={draft.stats.subscribers} 
          onChange={(e) => update("subscribers", e.target.value)} 
        />
      </Card>
      <Card>
        <Input 
          label={<span className="text-black">Total Views</span>} 
          className="text-black"
          value={draft.stats.views} 
          onChange={(e) => update("views", e.target.value)} 
        />
      </Card>
    </div>
  );
}