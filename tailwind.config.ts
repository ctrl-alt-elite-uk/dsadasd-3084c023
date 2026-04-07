import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      colors: {
        // The accent is driven by a CSS custom property set in globals.css
        // from site.config.theme.accent. Components reference `accent-*`
        // classes which resolve via these var(...) values at runtime, so
        // changing the config accent doesn't require a Tailwind rebuild
        // (the JIT picks up the classnames; var(--accent) does the rest).
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
