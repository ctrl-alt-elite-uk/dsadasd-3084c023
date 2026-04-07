import { Container } from "./Container";
import { Button } from "./Button";
import { primaryCta, siteConfig } from "@/lib/config";

export function Hero({
  headline,
  sub,
}: {
  headline: string;
  sub: string;
}) {
  const cta = primaryCta();
  return (
    <section className="bg-white">
      <Container className="pt-16 md:pt-24 pb-12 md:pb-20">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
          {siteConfig.name}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 leading-tight max-w-3xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl">
          {sub}
        </p>
        <div className="mt-10 flex gap-4">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      </Container>
    </section>
  );
}
