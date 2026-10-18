export const site = {
  name: "DEVS",
  wordmark: "<Devs/>",
  tagline: "Commerce, engineered with care.",
  headline: "Shopify stores, built with purpose.",
  description:
    "Shopify theme development, custom storefront sections, store development, performance improvements, and dedicated theme documentation and support.",
  shortDescription:
    "Custom storefront development, carefully engineered Shopify themes, and dependable support for growing ecommerce businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  supportResponseTarget: "two business days",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/themes", label: "Themes" },
    { href: "/docs", label: "Documentation" },
    { href: "/support", label: "Support" },
  ],
  footerGroups: {
    studio: [
      { href: "/about", label: "About" },
      { href: "/work", label: "Work" },
      { href: "/contact", label: "Discuss a project" },
      { href: "/privacy", label: "Privacy" },
    ],
    services: [
      { href: "/services/theme-customization", label: "Theme customization" },
      { href: "/services/custom-sections", label: "Custom sections" },
      { href: "/services/store-development", label: "Store development" },
      { href: "/services/theme-development", label: "Theme development" },
      { href: "/services/maintenance", label: "Maintenance" },
      { href: "/services/performance", label: "Performance" },
      { href: "/services/shopify-plus", label: "Shopify Plus" },
      { href: "/services/accessibility-seo", label: "Accessibility & SEO" },
    ],
    products: [
      { href: "/themes", label: "Theme catalog" },
      { href: "/docs", label: "Documentation" },
      { href: "/support", label: "Theme support" },
    ],
  },
} as const;

export type NavItem = (typeof site.nav)[number];
