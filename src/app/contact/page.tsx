import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceEnquiryForm } from "@/components/forms/ServiceEnquiryForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";
import { SERVICE_OPTIONS } from "@/lib/validation";

export const metadata = buildMetadata({
  title: "Discuss a project",
  description:
    "Tell DEVS about your Shopify project. Share what you are building, improving, or trying to fix to get a scoped estimate.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const defaultService =
    params.service && SERVICE_OPTIONS.includes(params.service as (typeof SERVICE_OPTIONS)[number])
      ? params.service
      : undefined;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Services enquiry"
        title="Tell me about your Shopify project."
        lede="Share what you are building, improving, or trying to fix. The more context you provide, the easier it is to understand the scope. This form is not theme product support."
      />
      <section className="container-shell grid gap-12 py-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-heading text-2xl font-semibold text-forest">What happens next</h2>
          <ol className="mt-4 space-y-4 text-muted">
            <li>
              <span className="font-medium text-forest">1. You send context.</span> Store URL, the service you think
              you need, and the problem are enough to start.
            </li>
            <li>
              <span className="font-medium text-forest">2. Scope is clarified.</span> If the work is a fit, you get
              questions and an estimate — not a surprise invoice.
            </li>
            <li>
              <span className="font-medium text-forest">3. No automatic timeline.</span> Reply timing depends on
              current work. There is no 24/7 promise on this form.
            </li>
          </ol>
          <p className="mt-6 text-sm text-muted">
            Using a DEVS theme and need product help? Use the{" "}
            <a href="/support" className="text-forest">
              theme support form
            </a>{" "}
            instead.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-stone bg-paper p-6 md:p-8">
            <ServiceEnquiryForm defaultService={defaultService} />
          </div>
        </div>
      </section>
    </main>
  );
}
