import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/themes/StatusBadge";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Qari — Editorial Bookshop Theme",
  description: "An editorial bookshop theme for independent sellers. Performance-first, accessible, and thoughtfully designed for books.",
  path: "/themes/qari",
});

const features = [
  {
    icon: "99",
    label: "Lighthouse Score",
    description: "Performance optimized for speed",
  },
  {
    icon: "AA",
    label: "WCAG 2.1 Compliant",
    description: "Full accessibility support",
  },
  {
    icon: "🛒",
    label: "Cart Drawer or Page",
    description: "Flexible cart experience",
  },
  {
    icon: "27",
    label: "Custom Sections",
    description: "Fully customizable layouts",
  },
];

const detailedFeatures = [
  {
    title: "Editorial Aesthetic",
    description: "Thoughtful typography and layouts designed for reading and discovery, perfect for bookstores and literary brands.",
  },
  {
    title: "Performance First",
    description: "Optimized for speed with a 99 Lighthouse score, ensuring fast load times and better SEO rankings.",
  },
  {
    title: "Full Accessibility",
    description: "WCAG 2.1 AA compliant with semantic HTML, proper focus states, and reduced-motion support.",
  },
  {
    title: "Unique FAQ Component",
    description: "Custom accordion-style FAQ section that answers common questions while maintaining the editorial feel.",
  },
  {
    title: "Custom Cursor",
    description: "Immersive reading experience with a custom cursor that enhances the editorial aesthetic.",
  },
  {
    title: "Format Picker",
    description: "Native format selection for books (hardcover/paperback) directly on product pages.",
  },
];

export default function QariPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="border-b border-stone bg-paper-shade">
        <div className="container-shell grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="font-heading text-4xl font-semibold text-forest md:text-5xl">Qari</h1>
              <StatusBadge status="development" />
            </div>
            <p className="text-xl text-muted mb-6">An editorial bookshop theme for independent sellers.</p>
            <p className="text-muted mb-8 max-w-xl">
              Qari was born from a simple idea: books deserve a digital storefront as thoughtful as their covers. Designed for independent bookstores, publishers, and literary-focused merchants, Qari brings the warmth of a physical bookshop to the digital realm with editorial layouts, performance-first architecture, and accessibility at its core.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="#">View Live Demo</ButtonLink>
              <ButtonLink href="#" variant="secondary">
                Buy on Shopify
              </ButtonLink>
            </div>
          </div>
          <div className="order-first md:order-last">
            <Image
              src="/images/themes/qari-theme-laptop-hero.jpg"
              alt="Qari theme hero showcase"
              width={1200}
              height={800}
              className="rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Performance & Feature Highlights */}
      <section className="container-shell py-16">
        <h2 className="font-heading text-3xl font-semibold text-forest mb-12 text-center">
          Built for performance and accessibility
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.label} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-sage text-forest font-heading text-2xl font-semibold">
                {feature.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-forest mb-2">{feature.label}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Showcase - Desktop Screenshots */}
      <section className="border-t border-stone bg-paper-shade">
        <div className="container-shell py-16">
          <h2 className="font-heading text-3xl font-semibold text-forest mb-12">
            Desktop Experience
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full rounded-2xl overflow-hidden border border-stone/20 shadow-xl">
              <Image
                src="/images/themes/qari-theme-home-page.png"
                alt="Qari Desktop Homepage"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="mt-3 text-sm text-muted text-center">Homepage</p>
          </div>
        </div>
      </section>

      {/* Mobile Views */}
      <section className="container-shell py-16">
        <h2 className="font-heading text-3xl font-semibold text-forest mb-12">
          Mobile Experience
        </h2>
        <div className="flex flex-col items-center">
          <div className="max-w-xs relative rounded-xl overflow-hidden border border-stone/20 shadow-lg w-full">
            <Image
              src="/images/themes/qari-theme-phone-hero.jpg"
              alt="Qari mobile hero"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <p className="mt-3 text-sm text-muted text-center">Mobile Hero</p>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="border-t border-stone bg-paper-shade">
        <div className="container-shell py-16">
          <h2 className="font-heading text-3xl font-semibold text-forest mb-12">
            Key Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detailedFeatures.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-stone bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-forest mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Documentation */}
      <section className="container-shell py-16">
        <div className="rounded-2xl bg-forest p-8 md:p-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-paper mb-4">
            Need help setting up Qari?
          </h2>
          <p className="text-sage mb-8 max-w-2xl mx-auto">
            Read the full documentation to get started with installation, configuration, and customization.
          </p>
          <ButtonLink href="/themes/qari/docs" variant="on-dark">
            Read Documentation
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
