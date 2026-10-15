import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BookMyDine QR — Digital Restaurant Menu Platform",
    short_name: "BookMyDine QR",
    description:
      "India's leading done-for-you digital menu platform. We design, host & manage beautiful QR code menus for restaurants, cafes, and hotels.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f623f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
    ],
  };
}
