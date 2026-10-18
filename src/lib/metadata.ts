import type { Metadata } from "next";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  ogImage?: string;
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  ogImage = "/images/og-default.svg",
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path, site.url);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en",
      type: "website",
      images: [{ url: ogImage, alt: `${site.name} — Shopify development, themes, and support` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: site.description,
    image: absoluteUrl("/logo/logo-light.svg", site.url),
    areaServed: ["US", "GB", "EU", "AU", "IN"],
    serviceType: [
      "Shopify theme customization",
      "Shopify store development",
      "Shopify theme development",
      "Shopify theme support",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, site.url),
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path, site.url),
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
    },
  };
}

export function articleJsonLd(title: string, description: string, path: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: absoluteUrl(path, site.url),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    ...(dateModified ? { dateModified } : {}),
  };
}
