import type { MetadataRoute } from "next";

// Indique aux moteurs ou trouver le plan du site, qui porte les deux langues.
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devia-site.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: SITE + "/sitemap.xml",
  };
}
