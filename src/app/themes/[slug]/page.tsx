import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/themes/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { getTheme, themes } from "@/data/themes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams() {
  return themes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return {};
  return buildMetadata({
    title: theme.name,
    description: theme.description,
    path: `/themes/${theme.slug}`,
    index: theme.status === "published",
  });
}

export default async function ThemeDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();

  const features = theme.status === "published" ? theme.features : theme.intendedFeatures;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Themes", path: "/themes" },
          { name: theme.name, path: `/themes/${theme.slug}` },
        ])}
      />
      <header className="border-b border-stone">
        <div className="container-shell py-12">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/themes", label: "Themes" },
              { label: theme.name },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-4xl font-semibold text-forest">{theme.name}</h1>
            <StatusBadge status={theme.status} />
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted">{theme.longDescription}</p>
          {theme.previewNote ? <p className="mt-4 max-w-2xl text-sm text-copper-deep">{theme.previewNote}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={theme.documentationPath}>Read documentation</ButtonLink>
            <ButtonLink href="/support" variant="secondary">
              Theme support
            </ButtonLink>
            {theme.shopifyListingUrl ? (
              <ButtonLink href={theme.shopifyListingUrl} variant="secondary">
                Theme Store listing
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </header>

      <section className="container-shell grid gap-6 py-12 md:grid-cols-2">
        {theme.screenshots.map((shot) => (
          <figure key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1400}
              height={900}
              className="h-auto w-full rounded-lg border border-stone"
            />
            <figcaption className="mt-2 text-sm text-muted">{shot.alt}</figcaption>
          </figure>
        ))}
      </section>

      <section className="border-t border-stone">
        <div className="container-shell grid gap-10 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">
              {theme.status === "published" ? "Features" : "Intended features"}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest">Intended use</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {theme.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Documentation:{" "}
              <Link href={theme.documentationPath} className="text-forest">
                {theme.documentationPath}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
