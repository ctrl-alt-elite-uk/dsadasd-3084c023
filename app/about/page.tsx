import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { readDoc, renderMarkdown } from "@/lib/content";

type AboutDoc = { title: string; intro: string };

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const { data, body } = readDoc<AboutDoc>("about");
  const html = renderMarkdown(body);
  return (
    <Section>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        {data.title}
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-10">{data.intro}</p>
      <Prose html={html} />
    </Section>
  );
}
