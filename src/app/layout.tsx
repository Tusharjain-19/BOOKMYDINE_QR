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
    default: "BookMyDine QR | Digital Menus & Service Rate Card QR Codes India",
    template: "%s | BookMyDine QR",
  },
  description:
    "BookMyDine QR is India's leading done-for-you digital menu and interactive service rate card platform. We design, host & manage contactless QR menus for restaurants, cafes, hotels, salons, clinics, car care & local businesses. Free setup, no app needed, live in 24 hours. Plans start at ₹199/month.",
  keywords: [
    "restaurant QR menu",
    "digital menu India",
    "QR code menu for restaurant",
    "service rate card QR code",
    "salon rate card QR",
    "hotel room dining QR menu",
    "clinic consultation rate card QR",
    "car detailing service menu QR",
    "gym membership rate card QR",
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
    "restaurant menu maker starting ₹199",
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
    title: "BookMyDine QR | Digital Menus & Service Rate Card QR Codes India",
    description:
      "Replace paper menus & rate cards with beautiful digital QR menus. Done-for-you service: we design, host & manage everything for restaurants, salons, hotels & clinics. Free setup, 6 premium themes, live in 24 hours. Starting at ₹199/month.",
    images: [
      {
        url: `${SITE_URL}/hero_artistic_showcase.png`,
        width: 1200,
        height: 630,
        alt: "BookMyDine QR | Digital Menu & Service Rate Card Platform India",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookMyDine QR | Digital Menus & Service Rate Card QR Codes India",
    description:
      "Done-for-you digital menu and service card platform for restaurants, cafes, salons & hotels. Free setup, 6 themes, live in 24 hours. Starting at ₹199/month.",
    images: [`${SITE_URL}/hero_artistic_showcase.png`],
    creator: "@bookmydine",
  },
  category: "Business Software & Digital Menus",
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
