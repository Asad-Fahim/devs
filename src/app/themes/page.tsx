import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/themes/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { themes } from "@/data/themes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Shopify themes",
  description:
    "DEVS Shopify themes with dedicated documentation and support. The catalog includes Qari.",
  path: "/themes",
});

export default function ThemesPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Themes", path: "/themes" },
        ])}
      />
      <PageHeader
        eyebrow="Theme catalog"
        title="Shopify themes, documented and supported"
        lede="Each DEVS theme has its own product page, documentation, changelog, and support entry point. Unpublished products are labeled as development previews and are not presented as Theme Store listings."
      />
      <section className="container-shell py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <div key={theme.slug}>
              <Link
                href={`/themes/${theme.slug}`}
                className="flex flex-col rounded-3xl border border-stone bg-white overflow-hidden hover:border-stone/80 hover:shadow-md transition-all no-underline"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={theme.coverImage}
                    alt={theme.screenshots[0]?.alt ?? `${theme.name} preview`}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading text-2xl font-semibold text-forest">{theme.name}</h2>
                      <StatusBadge status={theme.status} />
                    </div>
                    <span className="text-lg font-semibold text-forest">$199</span>
                  </div>
                  <p className="mt-3 text-muted">{theme.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
