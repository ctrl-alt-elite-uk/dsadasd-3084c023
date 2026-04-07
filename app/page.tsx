import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { readDoc, renderMarkdown } from "@/lib/content";

type HomeDoc = {
  hero: { headline: string; sub: string };
  features: Array<{ title: string; body: string }>;
};

export default function HomePage() {
  const { data, body } = readDoc<HomeDoc>("home");
  const html = renderMarkdown(body);
  return (
    <>
      <Hero headline={data.hero.headline} sub={data.hero.sub} />
      <Section>
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {data.features.map((feature) => (
            <div key={feature.title}>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
        <Prose html={html} />
      </Section>
    </>
  );
}
