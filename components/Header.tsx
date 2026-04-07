import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Container } from "./Container";
import { navEntries } from "@/lib/config";
import { siteConfig } from "@/lib/config";

// Header renders the client's logo if public/logo.svg exists, otherwise
// falls back to a wordmark of siteConfig.name in the display font. The
// check happens at build time (file system read in a Server Component).
function hasLogoAsset(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "logo.svg"));
  } catch {
    return false;
  }
}

export function Header() {
  const logo = hasLogoAsset();
  const nav = navEntries();
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/logo.svg"
              alt={siteConfig.name}
              className="h-8 w-auto"
            />
          ) : (
            <span className="font-display text-xl font-bold text-slate-900 tracking-tight">
              {siteConfig.name}
            </span>
          )}
        </Link>
        {nav.length > 1 && (
          <nav className="flex items-center gap-6">
            {nav.map((entry) => (
              <Link
                key={entry.page}
                href={entry.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                {entry.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
