import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { ContactForm } from "@/components/ContactForm";
import { readDoc, renderMarkdown } from "@/lib/content";
import { siteConfig } from "@/lib/config";

type ContactDoc = { title: string; intro: string };

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { data, body } = readDoc<ContactDoc>("contact");
  const html = renderMarkdown(body);

  // Per-site override wins; otherwise fall back to the shared env var set by
  // the automation framework at Vercel project creation time.
  const accessKey =
    siteConfig.contact.web3formsAccessKey ??
    process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY;
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  return (
    <Section>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        {data.title}
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-10">{data.intro}</p>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Prose html={html} />
          <dl className="mt-6 space-y-2 text-sm text-slate-700">
            {siteConfig.contact.email && (
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd>
                  <a
                    className="text-accent hover:underline"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            )}
            {siteConfig.contact.phone && (
              <div>
                <dt className="font-semibold text-slate-900">Phone</dt>
                <dd>
                  <a
                    className="text-accent hover:underline"
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  >
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
            )}
            {siteConfig.contact.address && (
              <div>
                <dt className="font-semibold text-slate-900">Address</dt>
                <dd>{siteConfig.contact.address}</dd>
              </div>
            )}
          </dl>
        </div>
        <ContactForm accessKey={accessKey} endpoint={endpoint} />
      </div>
    </Section>
  );
}
