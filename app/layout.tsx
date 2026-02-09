import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moazzam Sultan – Online Math Tutor | Learn Mathematics Easily",
  description:
    "Moazzam Sultan is a professional mathematics tutor from Pakistan offering interactive online lessons in English, Hindi, and Urdu. Book a trial lesson and improve your math skills today.",
  keywords: [
    "Moazzam Sultan",
    "Math tutor",
    "Online math lessons",
    "Mathematics tutoring",
    "Learn math online",
    "Math teacher Pakistan",
    "O-Level Math",
    "A-Level Math",
  ],
  authors: [{ name: "Moazzam Sultan" }],
  openGraph: {
    title: "Moazzam Sultan – Online Math Tutor",
    description:
      "Interactive online math lessons by Moazzam Sultan in English, Hindi, and Urdu. Improve your understanding and confidence in mathematics.",
    url: "https://www.moazzamsultan.com",
    siteName: "Moazzam Sultan Portfolio",
    images: [
      {
        url: "https://www.moazzamsultan.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Moazzam Sultan teaching mathematics online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moazzam Sultan – Online Math Tutor",
    description:
      "Interactive online math lessons by Moazzam Sultan in English, Hindi, and Urdu.",
    images: ["https://www.moazzamsultan.com/hero-image.jpg"],
    site: "@MoazzamSultan",
    creator: "@MoazzamSultan",
  },
  robots: "index, follow",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Moazzam Sultan",
  jobTitle: "Mathematics Tutor",
  description:
    "Professional mathematics tutor offering interactive online lessons. Expert in O-Levels, A-Levels, and Punjab Board curriculum.",
  url: "https://www.moazzamsultan.com",
  image: "https://www.moazzamsultan.com/hero-image.jpg",
  sameAs: [
    "https://www.instagram.com/iammoazzamsultan",
    "https://www.youtube.com/@iammoazzamsultan",
    "https://wa.me/923097016696",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Lahore", 
  },
  knowsAbout: [
    "Mathematics",
    "Calculus",
    "Algebra",
    "O-Level Math",
    "A-Level Math",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fix: Moved inside <body> to ensure it renders in source code */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
