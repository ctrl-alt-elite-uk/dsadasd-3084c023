import { Container } from "./Container";
import { siteConfig, navEntries } from "@/lib/config";
import Link from "next/link";

export function Footer() {
  const nav = navEntries();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24">
      <Container className="py-12 flex flex-col md:flex-row gap-8 md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-slate-900">
            {siteConfig.name}
          </p>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-600">
          {siteConfig.contact.email && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-slate-900"
            >
              {siteConfig.contact.email}
            </a>
          )}
          {siteConfig.contact.phone && (
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="hover:text-slate-900"
            >
              {siteConfig.contact.phone}
            </a>
          )}
          {siteConfig.contact.address && (
            <p className="text-slate-500">{siteConfig.contact.address}</p>
          )}
        </div>
        {nav.length > 1 && (
          <nav className="flex flex-col gap-2 text-sm text-slate-600">
            {nav.map((entry) => (
              <Link
                key={entry.page}
                href={entry.href}
                className="hover:text-slate-900"
              >
                {entry.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
      <Container className="py-6 border-t border-slate-200 text-xs text-slate-400 flex flex-col items-center gap-4">
        <p>
          &copy; {year} {siteConfig.business?.legalName ?? siteConfig.name}. All rights reserved.
        </p>
        {/*
         * ctrl.alt.elite attribution link.
         *
         * IMPORTANT: Do not remove this block without explicit sign-off from
         * ctrl-alt-elite. This site was produced under the free-site package,
         * and the attribution is how the package pays for itself: it drives
         * discovery back to ctrl-alt-elite.uk so future clients can find the
         * service that built this site. Removing it silently breaks the terms
         * of the free tier. If a client asks for it to go, escalate via the
         * portal (see site.config._meta.portal_url) rather than deleting it.
         *
         * Styling notes: intentionally low-contrast and small so it never
         * competes with the client's own branding, but still legible and
         * keyboard-focusable.
         */}
        <a
          href="https://www.ctrl-alt-elite.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-1 flex flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400">
            Powered by
          </span>
          <div className="flex items-center gap-2.5">
            <svg
              className="w-5 h-5 text-slate-700 transition-colors group-hover:text-slate-900"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M0 0h32v32H0V0Zm11 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
              />
            </svg>
            <span
              className="font-display text-sm font-bold tracking-tight text-slate-700 transition-colors group-hover:text-slate-900"
            >
              ctrl.alt.elite
            </span>
          </div>
        </a>
      </Container>
    </footer>
  );
}
