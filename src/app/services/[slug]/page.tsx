import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService, services } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(service.title, service.seoDescription, `/services/${service.slug}`)} />
      <header className="border-b border-stone">
        <div className="container-shell py-12 md:py-16">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { label: service.title },
            ]}
          />
          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-forest md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{service.lede}</p>
          <div className="mt-8">
            <ButtonLink href={`/contact?service=${service.slug}`}>Request a project estimate</ButtonLink>
          </div>
        </div>
      </header>

      <section className="container-shell grid gap-12 py-14 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Problems this work addresses</h2>
            <ul className="mt-6 space-y-5">
              {service.problems.map((problem) => (
                <li key={problem.title} className="border-t border-stone pt-4">
                  <h3 className="font-heading text-lg font-semibold text-forest">{problem.title}</h3>
                  <p className="mt-2 text-muted">{problem.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Typical deliverables</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Shopify capabilities in play</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {service.shopifyCapabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Questions</h2>
            <div className="mt-4">
              <FaqList items={service.faqs} />
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-lg bg-sage p-5">
            <h2 className="font-heading text-lg font-semibold text-forest">Included</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-stone p-5">
            <h2 className="font-heading text-lg font-semibold text-forest">Usually scoped separately</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {service.outOfScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-forest p-5 text-paper">
            <h2 className="font-heading text-lg font-semibold">Start with a brief</h2>
            <p className="mt-2 text-sm text-sage">
              Estimates follow scope. There is no published rate card on this site.
            </p>
            <div className="mt-4">
              <ButtonLink href={`/contact?service=${service.slug}`} variant="on-dark">
                Request an estimate
              </ButtonLink>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
