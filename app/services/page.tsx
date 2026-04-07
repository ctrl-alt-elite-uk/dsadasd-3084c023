import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { ServicesList, type ServiceItem } from "@/components/ServicesList";
import { readDoc, renderMarkdown } from "@/lib/content";

type ServicesDoc = {
  title: string;
  intro: string;
  services: ServiceItem[];
};

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  const { data, body } = readDoc<ServicesDoc>("services");
  const html = renderMarkdown(body);
  return (
    <Section>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        {data.title}
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-10">{data.intro}</p>
      <ServicesList services={data.services} />
      <div className="mt-10">
        <Prose html={html} />
      </div>
    </Section>
  );
}
