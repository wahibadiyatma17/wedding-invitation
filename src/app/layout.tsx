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
  title: "Undangan Pernikahan Aji & Ery - 24 Januari 2026",
  description: "Undangan pernikahan Aji & Ery. Mohon doa restu untuk hari bahagia kami",
  keywords: ["undangan pernikahan", "wedding invitation", "Aji & Ery", "pernikahan", "wedding"],
  authors: [{ name: "Aji & Ery" }],
  creator: "Aji & Ery",
  publisher: "Aji & Ery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Undangan Pernikahan Aji & Ery",
    description: "Undangan pernikahan Aji & Ery. Mohon doa restu untuk hari bahagia kami",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "Undangan Pernikahan Aji & Ery",
    images: [
      {
        url: "/images/aji-ery.png",
        width: 1200,
        height: 630,
        alt: "Aji & Ery Wedding Invitation",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Aji & Ery",
    description: "Undangan pernikahan Aji & Ery. Mohon doa restu untuk hari bahagia kami",
    images: ["/images/aji-ery.png"],
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
        {children}
      </body>
    </html>
  );
}
