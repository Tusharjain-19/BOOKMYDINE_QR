import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";

const SITE_URL = "https://bookmydineqr.vercel.app";

// Known menu slugs from the application
const menuSlugs = [
  "cafe-cozy",
  "l-orangerie",
  "tandoori-palace",
  "komorebi-bistro",
  "street-express",
  "neon-taproom",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/onboard`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // City landing pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Menu pages
  const menuPages: MetadataRoute.Sitemap = menuSlugs.map((slug) => ({
    url: `${SITE_URL}/menu/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...corePages, ...cityPages, ...menuPages];
}
