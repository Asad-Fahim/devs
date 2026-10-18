import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { DocSearch } from "@/components/docs/DocSearch";
import { StatusBadge } from "@/components/themes/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { themes } from "@/data/themes";
import { getSearchIndex, getThemeArticles } from "@/lib/docs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Documentation",
  description: "Documentation for DEVS Shopify themes, including getting started guides, settings, and changelogs.",
  path: "/docs",
});

export default function DocsHomePage() {
  const records = getSearchIndex();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
        ])}
      />
      <PageHeader
        eyebrow="Documentation"
        title="Theme documentation"
        lede="Guides are organized per theme. Search titles and article text, then open the relevant guide. Theme support is separate from Shopify development enquiries."
      />
      <section className="container-shell py-12">
        <div className="max-w-xl">
          <DocSearch records={records} />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => {
            const articles = getThemeArticles(theme.slug).filter((article) => article.slug.length > 0);
            return (
              <div key={theme.slug}>
                <Link
                  href={theme.documentationPath}
                  className="block rounded-2xl border border-stone/30 bg-white p-6 hover:shadow-md transition-all duration-200 no-underline"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-heading text-2xl font-semibold text-forest">
                      {theme.name}
                    </h2>
                    <StatusBadge status={theme.status} />
                  </div>
                  <p className="mt-3 text-muted">{theme.description}</p>
                  <span className="mt-4 inline-flex items-center text-forest font-medium hover:text-copper-deep transition-colors">
                    Read documentation &rarr;
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-sm text-muted">
          Still need help with a DEVS theme?{" "}
          <Link href="/support" className="text-forest">
            Open the support center
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
