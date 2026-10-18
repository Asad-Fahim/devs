import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Shopify services",
  description:
    "Shopify theme customization, custom sections, store development, custom themes, maintenance, performance, Plus, and accessibility work.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHeader
        eyebrow="Services"
        title="Shopify development, scoped to the actual problem"
        lede="DEVS is an independent studio. Engagements start with a written scope. Pricing depends on the work, so estimates are requested rather than published as packages."
      />
      <section className="container-shell py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-12 rounded-lg bg-sage px-6 py-8">
          <h2 className="font-heading text-2xl font-semibold text-forest">Request a project estimate</h2>
          <p className="mt-2 max-w-2xl text-muted">
            There are no public retainers or one-click packages on this site. If you have a store, a theme, or a
            problem in mind, send the context.
          </p>
          <div className="mt-5">
            <ButtonLink href="/contact">Discuss a project</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
