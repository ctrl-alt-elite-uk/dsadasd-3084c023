import type { MetadataRoute } from "next";
import { navEntries } from "@/lib/config";

// Only pages linked via site.config.pages appear in the sitemap. Hidden page
// files still exist in the repo so Claude Code can promote them later without
// re-scaffolding, but search engines shouldn't crawl them.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const now = new Date();
  return navEntries().map((entry) => ({
    url: `${base}${entry.href === "/" ? "" : entry.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: entry.page === "home" ? 1.0 : 0.7,
  }));
}
