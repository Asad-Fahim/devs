import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ThemeSupportForm } from "@/components/forms/ThemeSupportForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { themes } from "@/data/themes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Theme support",
  description:
    "Support for DEVS Shopify themes. Choose your theme, describe the issue, and send the details needed to investigate it.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Support", path: "/support" },
        ])}
      />
      <PageHeader
        eyebrow="Theme support"
        title="Need help with a DEVS theme?"
        lede="Choose your theme, describe the issue, and provide the details needed to investigate it. This form is for merchants using a DEVS theme — not for new development projects."
      />
      <section className="container-shell grid gap-12 py-14 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">What support covers</h2>
            <p className="mt-3 text-muted">
              Support covers issues and questions related to DEVS theme products: installation, theme editor settings,
              documented features, and bugs in the theme itself.
            </p>
            <p className="mt-3 text-muted">
              Custom feature development, third-party app conflicts, merchant-specific modifications, and unrelated
              store issues may need a separate investigation or a paid service engagement. Paid work is never required
              for ordinary theme support.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Response target</h2>
            <p className="mt-3 text-muted">
              Theme support requests are handled with a target of no more than two business days, subject to Shopify
              Theme Store requirements for published products. This is not 24/7 coverage and there is no ticket
              tracker on this site.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Read the docs first</h2>
            <ul className="mt-3 space-y-2">
              {themes.map((theme) => (
                <li key={theme.slug}>
                  <Link href={theme.documentationPath} className="text-forest">
                    {theme.name} documentation
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted">
            Need storefront development instead?{" "}
            <Link href="/contact" className="text-forest">
              Send a project enquiry
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-stone bg-paper p-6 md:p-8">
            <h2 className="font-heading text-2xl font-semibold text-forest">Support request</h2>
            <p className="mt-2 text-sm text-muted">
              Share only what is needed to reproduce the issue. Do not send passwords, access tokens, private admin
              links, or customer data.
            </p>
            <div className="mt-6">
              <ThemeSupportForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
