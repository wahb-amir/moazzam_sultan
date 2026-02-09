// src/data.js
// central place for constants, links and sample data

import { Users, GraduationCap, Video, Play, Youtube } from 'lucide-react';

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/923097016696",
  instagram: "https://instagram.com/iammoazzamsultan?igsh=MWIyYm5kcTVzenIwag==",
  youtube: "https://www.youtube.com/@iammoazzamsultan",
  email: "mailto:sultanmoazzam3@gmail.com"
};

export const STATS = [
  { label: "Subscribers", value: "2.84k+", icon: Users },
  { label: "Experience", value: "4+ Years", icon: GraduationCap },
  { label: "Videos", value: "22+", icon: Video },
  { label: "Views", value: "9.7k+", icon: Play },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: "video",
    title: "Punjab Curriculum Math",
    category: "Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    embedId: "example_video_1"
  },
  {
    id: 2,
    type: "photo",
    title: "Teaching Setup",
    category: "Behind the Scenes",
    src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    type: "video",
    title: "Cambridge Past Papers",
    category: "Exam Prep",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800",
    embedId: "example_video_2"
  },
  {
    id: 4,
    type: "achievement",
    title: "Master's Degree in Mathematics",
    category: "Education",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    type: "video",
    title: "Algebra Tricks",
    category: "Shorts",
    thumbnail: "https://images.unsplash.com/photo-1617526738882-1ea945ce3e56?auto=format&fit=crop&q=80&w=800",
    embedId: "example_video_3"
  },
  {
    id: 6,
    type: "photo",
    title: "Student Success Session",
    category: "Community",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "O-Level Student",
    text: "Sir Moazzam's method of using the graphic tablet made online learning feel just like a physical classroom. My grades improved significantly."
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    role: "Matric Student",
    text: "The best math tutor I've found. He explains complex algebra concepts in English and Urdu, which really helped me understand the logic."
  },
  {
    id: 3,
    name: "Sarah J.",
    role: "Parent",
    text: "Highly professional and punctual. The step-by-step approach to Cambridge topical past papers was exactly what my son needed."
  }
];
