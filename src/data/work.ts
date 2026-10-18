export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  challenge: string;
  workCompleted: string[];
  technologies: string[];
  screenshots: { src: string; alt: string }[];
  relatedServices: string[];
  outcomes?: string[];
  year?: string;
};

/**
 * Published case studies only. Do not add fictional clients, logos,
 * testimonials, or metrics. New projects should be added here as verified
 * work becomes available.
 */
export const projects: Project[] = [
  {
    slug: "nasir-book-depot",
    title: "Nasir Book Depot",
    summary: "Shopify E-commerce Design & Development — Customizing the Focal theme for a heritage bookstore established in 1988.",
    context: "Nasir Book Depot's history provides a meaningful foundation for its brand identity. Mr. Nasir Ahmed established the bookstore in Hazrat Nizamuddin, New Delhi in 1988. The business represents continuity across generations and a long-standing relationship with its customers. The store's core identity is rooted in books, Islamic literature, and religious essentials. The Shopify project brings this established retail identity into an online storefront that can present products, collections, and customer information in a structured way.",
    challenge: "A book catalog has specific UX requirements that needed to be addressed: Language clarity (customers should know which language or translation a book uses before purchasing), Edition clarity (hardcover, paperback, pocket edition, volume count), Readable book titles (long titles and author names must fit product cards), Consistent product imagery, Useful filtering, Clear pricing, and Discoverability through search.",
    workCompleted: [
      "Shopify theme customization using Focal theme",
      "Liquid template and section modifications",
      "Custom CSS for brand color implementation",
      "Responsive design for mobile, tablet, and desktop",
      "Product grid optimization for book catalog",
      "Navigation and collection filtering enhancements",
    ],
    technologies: ["Shopify", "Liquid", "CSS", "JavaScript", "Focal Theme"],
    screenshots: [
      { src: "/images/themes/nasir-book-depot-hero.png", alt: "Nasir Book Depot desktop homepage" },
      { src: "/images/themes/nasir-book-depot-phone.png", alt: "Nasir Book Depot mobile view" },
      { src: "/images/themes/nasir-book-depot-tablet.png", alt: "Nasir Book Depot tablet view" },
    ],
    relatedServices: ["theme-customization", "custom-sections", "store-development"],
    year: "2026",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
