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
    default: "BookMyDine QR — #1 Done-For-You Restaurant QR Menu & Digital Menu Software India",
    template: "%s | BookMyDine QR",
  },
  description:
    "BookMyDine QR is India's leading done-for-you digital menu platform. We design, host & manage beautiful contactless QR menus for restaurants, cafes, hotels, bars and cloud kitchens. Free setup, no app needed, live in 24 hours. Plans start at ₹99/month.",
  keywords: [
    "restaurant QR menu",
    "digital menu India",
    "QR code menu for restaurant",
    "done for you digital menu service",
    "restaurant menu software India",
    "free QR menu setup",
    "restaurant menu builder India",
    "contactless dining QR code",
    "cafe QR menu",
    "hotel QR menu software",
    "cloud kitchen digital menu",
    "printable QR table stand design",
    "restaurant technology India",
    "best QR menu provider India",
    "touchless menu without app download",
    "restaurant menu maker starting ₹99",
    "food menu QR generator",
    "thali restaurant digital menu",
    "fast food QR menu"
  ],
  authors: [{ name: "BookMySlot Tech Services", url: SITE_URL }],
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
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/icon.svg", "/favicon.ico"],
    apple: [
      { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "BookMyDine QR",
    title: "BookMyDine QR — Done-For-You Restaurant QR Menu Platform India",
    description:
      "Replace paper menus with beautiful digital QR menus. Done-for-you service: we design, host & manage everything. Free custom setup, 6 premium themes, live in 24 hours. Starting at ₹99/month.",
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
    title: "BookMyDine QR — Done-For-You Restaurant QR Menus India",
    description:
      "Done-for-you digital menu service for restaurants, cafes & hotels. Free setup, 6 themes, live in 24 hours. Starting at ₹99/month.",
    images: [`${SITE_URL}/hero_artistic_showcase.png`],
    creator: "@bookmydine",
  },
  category: "Restaurant Technology & Software",
  other: {
    "theme-color": "#0f623f",
    "apple-mobile-web-app-title": "BookMyDine QR",
    "application-name": "BookMyDine QR",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "geo.region": "IN",
    "geo.placename": "India",
    "rating": "General",
    "revisit-after": "7 days"
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
