import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
        404
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        Page not found
      </h1>
      <p className="text-lg text-slate-600 max-w-xl mb-8">
        We couldn&apos;t find the page you were looking for. It may have moved
        or never existed.
      </p>
      <Link
        href="/"
        className="bg-accent text-accent-foreground font-semibold px-6 py-3 inline-block"
      >
        Back to home
      </Link>
    </Section>
  );
}
