import { z } from "zod";

// Schema for site.config.ts. This is the contract between the template, the
// ctrl-alt-elite automation framework (which seeds it from brief data), and
// Claude Code (which iterates on it during the design phase). Changes here
// are effectively API-breaking for the automation seed handler - bump with
// care and update lib/automations/free-site/brief-to-config.ts in the main
// ctrl-alt-elite repo to match.

export const PageKey = z.enum(["home", "about", "services", "contact"]);
export type PageKey = z.infer<typeof PageKey>;

export const PrimaryGoal = z.enum([
  "get_customers",
  "show_work",
  "basic_info",
  "other",
]);
export type PrimaryGoal = z.infer<typeof PrimaryGoal>;

export const SiteConfigSchema = z.object({
  // Business name. Maps from brief.business_name.
  name: z.string().min(1),
  // Short tag under the business name. Maps from brief.business_description
  // (first 160 chars); longer copy goes in content/home.md.
  tagline: z.string().min(1).max(160),
  // Used to pick primary CTA copy and hero emphasis. Maps from brief.site_goal.
  primaryGoal: PrimaryGoal,
  // Pages shown in nav + sitemap. All page files exist in the repo but only
  // those listed here are linked. Maps from brief.page_count:
  //   1 -> ["home"]
  //   2 -> ["home", "contact"]
  //   3 -> ["home", "about", "contact"] or ["home", "services", "contact"]
  //           (the seed handler picks based on primaryGoal)
  pages: z.array(PageKey).min(1),
  theme: z.object({
    // Hex accent colour. Parsed into an `rgb(r g b)` triple at build time by
    // lib/config.ts and injected into `--accent` on <html>.
    accent: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .default("#3b82f6"),
  }),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    // Optional per-site override. If unset, the ContactForm uses the shared
    // NEXT_PUBLIC_CONTACT_ACCESS_KEY env var set on the Vercel project.
    web3formsAccessKey: z.string().optional(),
  }),
  business: z
    .object({
      legalName: z.string().optional(),
      areaServed: z.string().optional(),
      // Schema.org openingHours format, e.g. "Mo-Fr 09:00-17:00".
      openingHours: z.array(z.string()).optional(),
    })
    .optional(),
  // Opaque metadata written by the seed handler so admins can trace a repo
  // back to its source project. Not rendered anywhere.
  _meta: z
    .object({
      project_id: z.string().uuid().optional(),
      package_slug: z.literal("free-site").optional(),
      seeded_at: z.string().datetime().optional(),
      portal_url: z.string().url().optional(),
    })
    .optional(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
