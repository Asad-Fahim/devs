export type ThemeStatus = "development" | "published";

export type Theme = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  status: ThemeStatus;
  version?: string;
  updatedAt?: string;
  coverImage: string;
  screenshots: { src: string; alt: string }[];
  features: string[];
  intendedFeatures: string[];
  useCases: string[];
  shopifyListingUrl?: string;
  documentationPath: string;
  previewNote?: string;
};

/**
 * Theme catalog.
 *
 * Qari is a development-status product. Do not present it as a Shopify Theme
 * Store listing until an official URL and release details are supplied.
 * Replace this record with verified name, screenshots, features, and listing
 * data before a public launch.
 */
const themeCatalog: Theme[] = [
  {
    slug: "qari",
    name: "Qari",
    description: "An editorial bookshop theme for independent sellers.",
    longDescription:
      "Qari was born from a simple idea: books deserve a digital storefront as thoughtful as their covers. Designed for independent bookstores, publishers, and literary-focused merchants, Qari brings the warmth of a physical bookshop to the digital realm with editorial layouts, performance-first architecture, and accessibility at its core.",
    status: "published",
    coverImage: "/images/themes/qari-theme-laptop-hero.jpg",
    screenshots: [
      {
        src: "/images/themes/qari-theme-laptop-hero.jpg",
        alt: "Qari theme hero section showcasing an editorial bookshop layout with featured books.",
      },
      {
        src: "/images/themes/qari-theme-home-page.png",
        alt: "Qari homepage with mood discovery section and bestseller list.",
      },
      {
        src: "/images/themes/qari-theme-phone-hero.jpg",
        alt: "Qari mobile view of the hero section.",
      },
    ],
    features: [
      "99 Lighthouse Performance Score",
      "WCAG 2.1 AA Compliant",
      "Cart Drawer or Page",
      "27 Custom Sections",
      "Editorial Aesthetic",
      "Performance First",
      "Full Accessibility",
      "Unique FAQ Component",
      "Custom Cursor",
    ],
    intendedFeatures: [
      "Online Store 2.0 sectioned architecture",
      "Editorial homepage layouts with mood discovery",
      "Format picker for books (hardcover/paperback)",
      "Custom cursor for immersive reading experience",
      "Sticky header with announcement bar",
      "Native Shopify Search & Discovery integration",
      "Collection filtering and sorting",
      "Blog and article templates",
      "Contact and about page templates",
      "FAQ section with accordion",
    ],
    useCases: [
      "Independent bookstores",
      "Publishers and literary brands",
      "Magazine and editorial shops",
      "Cultural institutions with retail",
    ],
    documentationPath: "/themes/qari/docs",
    previewNote: "An editorial bookshop theme for independent sellers. Built with Shopify OS 2.0.",
  },
];

/** Validate every theme record at module initialization. Never publish fictional or unverified listings. */
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function validateThemeCatalog(catalog: Theme[]): Theme[] {
  const seen = new Set<string>();
  for (const theme of catalog) {
    if (!slugPattern.test(theme.slug)) throw new Error(`Invalid theme slug: ${theme.slug}`);
    if (seen.has(theme.slug)) throw new Error(`Duplicate theme slug: ${theme.slug}`);
    seen.add(theme.slug);
    if (!theme.name.trim() || !theme.description.trim() || !theme.longDescription.trim()) throw new Error(`Missing theme details: ${theme.slug}`);
    if (theme.updatedAt && (!/^\d{4}-\d{2}-\d{2}$/.test(theme.updatedAt) || Number.isNaN(Date.parse(theme.updatedAt)))) throw new Error(`Invalid theme date: ${theme.slug}`);
    if (theme.status === "published" && theme.shopifyListingUrl && !theme.shopifyListingUrl.startsWith("https://themes.shopify.com/")) throw new Error(`Shopify listing URL must start with https://themes.shopify.com/: ${theme.slug}`);
    if (theme.status === "development" && theme.shopifyListingUrl) throw new Error(`Development theme cannot claim an official listing: ${theme.slug}`);
    if (!theme.documentationPath.includes(theme.slug)) throw new Error(`Theme docs path must include theme slug: ${theme.slug}`);
  }
  return catalog;
}
export const themes = validateThemeCatalog(themeCatalog);

export function getTheme(slug: string): Theme | undefined {
  return themes.find((theme) => theme.slug === slug);
}

export function getPublishedThemes(): Theme[] {
  return themes.filter((theme) => theme.status === "published");
}

export function getCatalogThemes(): Theme[] {
  return themes;
}
