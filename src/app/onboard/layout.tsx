import type { Metadata } from "next";

const SITE_URL = "https://bookmydineqr.vercel.app";

export const metadata: Metadata = {
  title: "Get Your Free QR Menu Setup — Restaurant Intake Form | BookMyDine QR",
  description:
    "Submit your restaurant details and menu to BookMyDine QR. Our team will design your custom digital QR menu for free within 24-48 hours. No credit card required. Plans start at ₹99/month.",
  alternates: {
    canonical: `${SITE_URL}/onboard`,
  },
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
  openGraph: {
    title: "Get Your Free QR Menu Setup — Restaurant Intake Form | BookMyDine QR",
    description:
      "Submit your restaurant details and menu to BookMyDine QR. We design your custom digital QR menu for free within 24-48 hours.",
    url: `${SITE_URL}/onboard`,
    siteName: "BookMyDine QR",
    locale: "en_IN",
    type: "website",
  },
};

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
