import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://bookmydineqr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BookMyDine QR — Free Restaurant QR Menu & Digital Menu Software India",
    template: "%s | BookMyDine QR",
  },
  description:
    "BookMyDine QR is India's leading done-for-you digital menu platform. We design, host & manage beautiful QR code menus for restaurants, cafes, hotels, bars and cloud kitchens. Free setup, no app needed, live in 24 hours.",
  keywords: [
    "restaurant QR menu",
    "digital menu",
    "QR code menu",
    "restaurant menu software",
    "free QR menu",
    "restaurant menu builder India",
    "contactless dining",
    "QR menu platform",
    "restaurant digital menu",
    "cafe QR menu",
    "hotel QR menu",
    "cloud kitchen menu",
    "restaurant automation India",
    "online menu maker",
    "restaurant technology",
  ],
  authors: [{ name: "BookMySlot Tech Services" }],
  creator: "BookMyDine QR",
  publisher: "BookMySlot Tech Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "XZVEE03vf-otD9SoWv7imPWO1N1UxZYtBlnYekxD6fo",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "BookMyDine QR",
    title: "BookMyDine QR — Free Restaurant QR Menu & Digital Menu Software India",
    description:
      "Replace paper menus with beautiful digital QR menus. Done-for-you service: we design, host & manage everything. Free setup, 6 premium themes, live in 24 hours. Starting at ₹99/month.",
    images: [
      {
        url: `${SITE_URL}/hero_artistic_showcase.png`,
        width: 1200,
        height: 630,
        alt: "BookMyDine QR — Digital Menu Platform for Restaurants in India",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookMyDine QR — Free Restaurant QR Menu & Digital Menu Software",
    description:
      "Done-for-you digital menu service for restaurants, cafes & hotels. Free setup, 6 themes, live in 24 hours. Starting at ₹99/month.",
    images: [`${SITE_URL}/hero_artistic_showcase.png`],
    creator: "@bookmydine",
  },
  category: "Technology",
  other: {
    "theme-color": "#0f623f",
    "apple-mobile-web-app-title": "BookMyDine QR",
    "application-name": "BookMyDine QR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
