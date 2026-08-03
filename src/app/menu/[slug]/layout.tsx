import type { Metadata } from "next";

const SITE_URL = "https://bookmydineqr.vercel.app";

const menuMeta: Record<string, { title: string; description: string }> = {
  "cafe-cozy": {
    title: "Minimalist Cafe — Live Digital Menu Preview",
    description: "View the live digital QR menu preview for Minimalist Cafe & Bakery. Clean typography and warm neutral tones built for artisanal coffee shops.",
  },
  "l-orangerie": {
    title: "Executive Fine Dining — Live Digital Menu Preview",
    description: "View the live digital QR menu preview for Executive Fine Dining. Deep obsidian aesthetic with refined metallic gold accents.",
  },
  "tandoori-palace": {
    title: "Heritage Indian — Live Digital Menu Preview",
    description: "View the live digital QR menu preview for Heritage Indian. Terracotta and warm amber aesthetic crafted for authentic Indian thali & tandoori restaurants.",
  },
  "komorebi-bistro": {
    title: "Modern Bistro — Live Digital Menu Preview",
    description: "View the live digital QR menu preview for Modern Bistro. Sleek crisp white layout with forest green highlights for contemporary bistros.",
  },
  "street-express": {
    title: "Street Food Express — Live Digital Menu Preview",
    description: "View the live digital QR menu preview for Street Food Express. Vibrant energetic design engineered for fast food outlets & food trucks.",
  },
  "neon-taproom": {
    title: "Premium Dark Lounge — Live Digital Menu Preview",
    description: "View the live digital QR menu preview for Premium Dark Lounge. Futuristic dark mode with ambient shader motion for night bars & pubs.",
  },
};

interface MenuLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MenuLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = menuMeta[slug] || {
    title: `${slug.replace("-", " ").toUpperCase()} — Digital Menu | BookMyDine QR`,
    description: `View the live mobile digital QR code menu for ${slug}. Mobile-optimized, fast-loading, and touchless.`,
  };

  return {
    title: meta.title,
    description: meta.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${SITE_URL}/menu/${slug}`,
    },
    openGraph: {
      title: `${meta.title} | BookMyDine QR`,
      description: meta.description,
      url: `${SITE_URL}/menu/${slug}`,
      siteName: "BookMyDine QR",
      type: "website",
    },
  };
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
