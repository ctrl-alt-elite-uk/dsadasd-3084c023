import { siteConfig } from "./config";

// Schema.org LocalBusiness JSON-LD. Included in the root layout so every page
// carries it. Most of the fields are optional - we only emit what's set.
export function localBusinessJsonLd(): Record<string, unknown> {
  const business = siteConfig.business ?? {};
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.legalName ?? siteConfig.name,
    description: siteConfig.tagline,
  };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) data.url = siteUrl;
  if (siteConfig.contact.email) data.email = siteConfig.contact.email;
  if (siteConfig.contact.phone) data.telephone = siteConfig.contact.phone;
  if (siteConfig.contact.address) data.address = siteConfig.contact.address;
  if (business.areaServed) data.areaServed = business.areaServed;
  if (business.openingHours && business.openingHours.length > 0) {
    data.openingHours = business.openingHours;
  }
  return data;
}
