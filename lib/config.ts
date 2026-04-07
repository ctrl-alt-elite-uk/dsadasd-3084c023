import rawConfig from "@/site.config";
import { SiteConfigSchema, type SiteConfig, type PageKey } from "@/site.config.types";

// Parse the config at module load. A bad config fails the build loudly,
// which is the right behaviour because a mis-seeded config would otherwise
// ship broken pages to the client.
export const siteConfig: SiteConfig = SiteConfigSchema.parse(rawConfig);

// Convert the hex accent into the `r g b` triple Tailwind's rgb() utilities
// expect via the CSS custom property. Computed once at build time.
export function accentRgbTriple(): string {
  const hex = siteConfig.theme.accent.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

// Foreground colour for text on an accent-coloured background. Luminance
// check keeps us readable across any client-chosen accent.
export function accentForegroundRgbTriple(): string {
  const hex = siteConfig.theme.accent.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Perceived luminance (ITU-R BT.601).
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.55 ? "15 23 42" /* slate-900 */ : "255 255 255";
}

// Primary CTA copy keyed off primaryGoal. Also used as the hero's main action.
export function primaryCta(): { label: string; href: string } {
  switch (siteConfig.primaryGoal) {
    case "get_customers":
      return { label: "Get in touch", href: "/contact" };
    case "show_work":
      return { label: "See our work", href: "/services" };
    case "basic_info":
      return { label: "Contact us", href: "/contact" };
    case "other":
      return { label: "Get in touch", href: "/contact" };
  }
}

// Whether a page is linked in nav/sitemap. The page files themselves always
// exist in the repo so Claude Code can promote them later without re-scaffolding.
export function pageIsLinked(page: PageKey): boolean {
  return siteConfig.pages.includes(page);
}

// Ordered nav entries for the header/footer.
export function navEntries(): Array<{ page: PageKey; label: string; href: string }> {
  const labels: Record<PageKey, { label: string; href: string }> = {
    home: { label: "Home", href: "/" },
    about: { label: "About", href: "/about" },
    services: { label: "Services", href: "/services" },
    contact: { label: "Contact", href: "/contact" },
  };
  const order: PageKey[] = ["home", "about", "services", "contact"];
  return order
    .filter((p) => siteConfig.pages.includes(p))
    .map((p) => ({ page: p, ...labels[p] }));
}
