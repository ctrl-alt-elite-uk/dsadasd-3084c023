import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 focus-visible:ring-accent",
  secondary:
    "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white focus-visible:ring-slate-900",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-5 py-3 font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
