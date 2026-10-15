import type { Metadata } from "next";

const SITE_URL = "https://bookmydineqr.vercel.app";

const menuMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  "cafe-cozy": {
    title: "Minimalist Cafe | Live Digital QR Menu Theme Preview | BookMyDine QR",
    description: "Experience the live mobile QR code menu preview for Minimalist Cafe & Bakery. Clean typography and warm neutral tones built for artisanal coffee shops and bakeries.",
    keywords: ["cafe QR menu", "coffee shop digital menu", "bakery QR code menu", "minimalist menu design", "digital cafe menu"],
  },
  "l-orangerie": {
    title: "Executive Fine Dining | Luxury Restaurant QR Menu Preview | BookMyDine QR",
    description: "Experience the live mobile QR code menu preview for Executive Fine Dining. Deep obsidian aesthetic with refined metallic gold accents for luxury upscale restaurants.",
    keywords: ["fine dining QR menu", "luxury restaurant digital menu", "black gold menu design", "upscale dining menu", "executive digital menu"],
  },
  "tandoori-palace": {
    title: "Heritage Indian | Thali & Tandoori QR Menu Theme Preview | BookMyDine QR",
    description: "Experience the live mobile QR code menu preview for Heritage Indian. Terracotta and warm amber aesthetic crafted for authentic Indian thali, sweets & tandoori restaurants.",
    keywords: ["Indian restaurant QR menu", "thali digital menu", "tandoori restaurant menu", "veg non-veg digital menu", "heritage restaurant menu"],
  },
  "komorebi-bistro": {
    title: "Modern Bistro | Contemporary Grill & Cafe QR Menu Preview | BookMyDine QR",
    description: "Experience the live mobile QR code menu preview for Modern Bistro. Crisp layout with forest green highlights for contemporary bistros, grills and salad bars.",
    keywords: ["bistro QR menu", "modern cafe digital menu", "grill restaurant QR menu", "contemporary digital menu", "green aesthetic menu"],
  },
  "street-express": {
    title: "Street Food Express | Fast Food & QSR QR Menu Theme Preview | BookMyDine QR",
    description: "Experience the live mobile QR code menu preview for Street Food Express. Vibrant energetic design with high-contrast colors engineered for QSR, burger joints and food trucks.",
    keywords: ["street food QR menu", "fast food digital menu", "QSR QR code menu", "food truck menu", "burger joint digital menu"],
  },
  "neon-taproom": {
    title: "Premium Dark Lounge | Bar, Pub & Club QR Menu Theme Preview | BookMyDine QR",
    description: "Experience the live mobile QR code menu preview for Premium Dark Lounge. Futuristic dark mode with ambient shader motion for night bars, lounges, taprooms & pubs.",
    keywords: ["bar QR menu", "pub digital menu", "cocktail lounge menu", "nightclub QR menu", "dark mode digital menu"],
  },
};

export function generateStaticParams() {
  return [
    { slug: "cafe-cozy" },
    { slug: "l-orangerie" },
    { slug: "tandoori-palace" },
    { slug: "komorebi-bistro" },
    { slug: "street-express" },
    { slug: "neon-taproom" },
  ];
}

interface MenuLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MenuLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = menuMeta[slug] || {
    title: `${slug.replace("-", " ").toUpperCase()} | Digital Menu | BookMyDine QR`,
    description: `View the live mobile digital QR code menu for ${slug}. Mobile-optimized, fast-loading, and touchless.`,
    keywords: ["restaurant QR menu", "digital menu", "QR code menu"],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
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
