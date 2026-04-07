import type { SiteConfig } from "./site.config.types";

// Default config. Committed to the template so a fresh clone builds cleanly
// with zero changes. The automation framework overwrites this file on seed;
// Claude Code updates it during design iteration (respect the types, don't
// touch _meta).
const config: SiteConfig = {
  name: "Your Business",
  tagline: "Replace this tagline with a short description of what you do.",
  primaryGoal: "basic_info",
  pages: ["home", "about", "services", "contact"],
  theme: {
    accent: "#3b82f6",
  },
  contact: {},
};

export default config;
