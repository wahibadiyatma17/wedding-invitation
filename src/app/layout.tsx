import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from 'next/headers';
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  const isAkadNikah = pathname.includes('/akad_nikah');
  const date = isAkadNikah ? '19 Januari 2026' : '24 Januari 2026';
  
  return {
    title: `Undangan Pernikahan Aji & Ery - ${date}`,
    description: `Akhmad Lutfiyan Aji & Khofifah Ery Nur Aeini mengundang Anda dalam momen sakral pernikahan kami. Mohon doa restu untuk hari bahagia kami pada ${date} di Ganeca Convention Hall, Purworejo.`,
    keywords: ["undangan pernikahan", "wedding invitation", "Aji & Ery", "pernikahan", "wedding", "Purworejo", date, "Akhmad Lutfiyan Aji", "Khofifah Ery Nur Aeini"],
    authors: [{ name: "Aji & Ery" }],
    creator: "Aji & Ery",
    publisher: "Aji & Ery",
    category: "wedding",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `Undangan Pernikahan Aji & Ery - ${date}`,
      description: `Akhmad Lutfiyan Aji & Khofifah Ery Nur Aeini mengundang Anda dalam momen sakral pernikahan kami. Mohon doa restu untuk hari bahagia kami pada ${date}.`,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: "Undangan Pernikahan Aji & Ery",
      images: [
        {
          url: "/images/aji-ery-social.png",
          width: 1200,
          height: 630,
          alt: `Aji & Ery Pre-Wedding Photo - Wedding Invitation ${date}`,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Undangan Pernikahan Aji & Ery - ${date}`,
      description: "Akhmad Lutfiyan Aji & Khofifah Ery Nur Aeini mengundang Anda dalam momen sakral pernikahan kami. Mohon doa restu untuk hari bahagia kami.",
      images: ["/images/aji-ery-social.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Pernikahan Akhmad Lutfiyan Aji & Khofifah Ery Nur Aeini",
    "description": "Upacara pernikahan Akhmad Lutfiyan Aji dan Khofifah Ery Nur Aeini",
    "startDate": "2026-01-24T10:00:00+07:00",
    "endDate": "2026-01-24T14:00:00+07:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Ganeca Convention Hall",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "JL. Kol Sugiono No.62",
        "addressLocality": "Kepatihan",
        "addressRegion": "Purworejo",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.7097322,
        "longitude": 110.0143547
      }
    },
    "organizer": {
      "@type": "Person",
      "name": "Akhmad Lutfiyan Aji & Khofifah Ery Nur Aeini"
    },
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/aji-ery-social.png`
    ]
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          containerStyle={{
            top: 20,
            right: 20,
            zIndex: 10000,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FDF1E9',
              color: '#311212',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '1rem',
              fontFamily: 'Crimson Text, serif',
              maxWidth: '90vw',
            },
            success: {
              iconTheme: {
                primary: '#87A96B',
                secondary: '#FDF1E9',
              },
              style: {
                border: '2px solid #87A96B',
              },
            },
            error: {
              iconTheme: {
                primary: '#A0522D',
                secondary: '#FDF1E9',
              },
              style: {
                border: '2px solid #A0522D',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
