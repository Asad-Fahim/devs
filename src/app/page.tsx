import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/themes/StatusBadge";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { themes } from "@/data/themes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "DEVS — Shopify Development, Themes & Support",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const processSteps = [
  {
    n: "01",
    title: "Discovery",
    body: "We look at the store, the catalog, and the actual problem — not a generic package.",
  },
  {
    n: "02",
    title: "Scope and estimate",
    body: "A written scope, assumptions, and an estimate. Work does not start on a vague handshake.",
  },
  {
    n: "03",
    title: "Development",
    body: "Implementation in a preview theme, with merchant-editable settings where they belong.",
  },
  {
    n: "04",
    title: "Testing and refinement",
    body: "Templates in scope are reviewed on mobile and desktop before anything is published.",
  },
  {
    n: "05",
    title: "Launch and handover",
    body: "You get the theme in your admin, notes on what changed, and support where it was agreed.",
  },
];

function HeroCode() {
  return (
    <figure className="overflow-hidden rounded-xl border border-forest-mid bg-forest shadow-xl shadow-forest/10" aria-label="Example Shopify Liquid section configuration">
      <div className="flex items-center justify-between border-b border-forest-mid px-5 py-4 font-mono text-[11px] text-sage">
        <span>sections/featured-collection.liquid</span><span className="flex gap-1.5" aria-hidden="true"><i className="h-2 w-2 rounded-full bg-copper"/><i className="h-2 w-2 rounded-full bg-sage/50"/><i className="h-2 w-2 rounded-full bg-sage/50"/></span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-7 text-paper sm:p-7 sm:text-[13px]"><code>{`{% schema %}
{
  "name": "Featured collection",
  "settings": [
    { "type": "collection",
      "id": "collection",
      "label": "Collection" },
    { "type": "range",
      "id": "products_to_show",
      "min": 2, "max": 12,
      "default": 4 }
  ],
  "presets": [
    { "name": "Featured collection" }
  ]
}
{% endschema %}`}</code></pre>
      <figcaption className="border-t border-forest-mid px-5 py-4 font-mono text-xs text-sage">Shopify Liquid · Merchant-editable by design</figcaption>
    </figure>
  );
}

export default function HomePage() {
  const featured = themes[0];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-stone">
        <div className="container-shell grid items-center gap-12 py-16 md:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow">Independent Shopify development studio</p>
            <h1 className="mt-4 font-heading text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-[3.5rem]">
              Shopify stores,
              <span className="block">built with <span className="text-copper-deep">purpose.</span></span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{site.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Discuss a project</ButtonLink>
              <ButtonLink href="/themes" variant="secondary">
                Explore themes
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">Using a DEVS theme? <Link href="/support" className="font-semibold text-forest underline underline-offset-4">Get theme support</Link></p>
          </div>
          <div className="lg:col-span-5"><HeroCode /></div>
        </div>
      </section>

      <section className="border-b border-stone" aria-labelledby="services-heading">
        <div className="container-shell py-16 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Services</p>
              <h2 id="services-heading" className="mt-3 font-heading text-3xl font-semibold text-forest">
                Practical Shopify engineering
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-medium text-forest">
              All services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {featured ? (
        <section className="border-b border-stone bg-sage" aria-labelledby="theme-heading">
          <div className="container-shell grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
            <div>
              <p className="eyebrow">Featured theme</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h2 id="theme-heading" className="font-heading text-3xl font-semibold text-forest">
                  {featured.name}
                </h2>
                <StatusBadge status={featured.status} />
              </div>
              <p className="mt-4 text-muted">{featured.description}</p>
              {featured.previewNote ? <p className="mt-3 text-sm text-copper-deep">{featured.previewNote}</p> : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/themes/${featured.slug}`}>Theme details</ButtonLink>
                <ButtonLink href={featured.documentationPath} variant="secondary">
                  Documentation
                </ButtonLink>
              </div>
            </div>
            <Image
              src={featured.coverImage}
              alt={featured.screenshots[0]?.alt ?? `${featured.name} preview`}
              width={1200}
              height={800}
              className="h-auto w-full rounded-lg border border-stone"
            />
          </div>
        </section>
      ) : null}

      <section className="border-b border-stone" aria-labelledby="process-heading">
        <div className="container-shell py-16 md:py-20">
          <p className="eyebrow">Approach</p>
          <h2 id="process-heading" className="mt-3 max-w-xl font-heading text-3xl font-semibold text-forest">
            A transparent process, scoped before it is built
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.n}>
                <p className="font-mono text-xs text-copper">{step.n}</p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-forest">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm text-muted">
            Delivery times depend on the brief. Fixed dates are only given against a written scope.
          </p>
        </div>
      </section>

      <section className="border-b border-stone" aria-labelledby="work-heading">
        <div className="container-shell py-16 md:py-20">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-heading" className="mt-3 font-heading text-3xl font-semibold text-forest">
            Case studies, when they can be shared
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Project write-ups are published only with real context, screenshots, and outcomes. There are no
            placeholder clients or invented metrics on this site. Typical work includes theme customization, custom
            sections, and storefront builds for independent merchants.
          </p>
          <Link href="/work" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-forest">
            Work and approach <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="border-b border-stone bg-paper-shade" aria-labelledby="docs-heading">
        <div className="container-shell grid gap-8 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">Themes and documentation</p>
            <h2 id="docs-heading" className="mt-3 font-heading text-3xl font-semibold text-forest">
              Each theme gets its own docs and support path
            </h2>
            <p className="mt-4 text-muted">
              The catalog is built to hold more than one product. Documentation, changelogs, and support requests are
              theme-specific so merchants are not left with a generic help page.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <ButtonLink href="/themes">Theme catalog</ButtonLink>
            <ButtonLink href="/docs" variant="secondary">
              Documentation
            </ButtonLink>
            <ButtonLink href="/support" variant="secondary">
              Theme support
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-forest text-paper" aria-labelledby="cta-heading">
        <div className="container-shell py-16 md:py-20">
          <h2 id="cta-heading" className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Have a Shopify project in mind?
          </h2>
          <p className="mt-4 max-w-xl text-sage">Share what you are building, improving, or trying to fix.</p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="on-dark">
              Tell me about your project
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
