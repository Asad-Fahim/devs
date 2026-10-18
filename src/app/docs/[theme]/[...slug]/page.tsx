import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DocSearch } from "@/components/docs/DocSearch";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { Mdx } from "@/components/docs/Mdx";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { JsonLd } from "@/components/ui/JsonLd";
import { getTheme, themes } from "@/data/themes";
import { getAdjacentArticles, getDoc, getDocNav, getSearchIndex, getThemeArticles } from "@/lib/docs";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

type Params = { theme: string; slug: string[] };

export function generateStaticParams() {
  return themes.flatMap((theme) =>
    getThemeArticles(theme.slug)
      .filter((article) => article.slug.length > 0)
      .map((article) => ({ theme: theme.slug, slug: article.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { theme: themeSlug, slug } = await params;
  const theme = getTheme(themeSlug);
  const article = getDoc(themeSlug, slug);
  if (!theme || !article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: article.href,
    index: theme.status === "published" && !article.draft,
  });
}

export default async function DocArticlePage({ params }: { params: Promise<Params> }) {
  const { theme: themeSlug, slug } = await params;
  const theme = getTheme(themeSlug);
  const article = getDoc(themeSlug, slug);
  if (!theme || !article) notFound();

  const groups = getDocNav(themeSlug);
  const adjacent = getAdjacentArticles(themeSlug, article.href);
  const records = getSearchIndex().filter((record) => record.themeSlug === themeSlug);
  const related = getThemeArticles(themeSlug)
    .filter((item) => item.href !== article.href && item.section === article.section && item.slug.length > 0)
    .slice(0, 3);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
          { name: theme.name, path: `/docs/${theme.slug}` },
          { name: article.title, path: article.href },
        ])}
      />
      <JsonLd data={articleJsonLd(article.title, article.description, article.href, article.updated)} />
      <div className="container-shell py-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/docs", label: "Documentation" },
            { href: `/docs/${theme.slug}`, label: theme.name },
            { label: article.title },
          ]}
        />
        <div className="mt-6 max-w-xl lg:hidden">
          <DocSearch records={records} placeholder={`Search ${theme.name} docs`} />
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <DocSidebar themeName={theme.name} groups={groups} currentHref={article.href} />
          </aside>
          <article className="lg:col-span-6">
            <p className="eyebrow">{article.section}</p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-forest">{article.title}</h1>
            <p className="mt-4 text-muted">{article.description}</p>
            {article.updated ? (
              <p className="mt-2 font-mono text-xs text-muted">Updated {formatDate(article.updated)}</p>
            ) : null}
            <div className="prose-docs mt-8">
              <Mdx source={article.content} />
            </div>
            <div className="mt-10 flex justify-between gap-4 border-t border-stone pt-6 text-sm">
              {adjacent.previous ? (
                <Link href={adjacent.previous.href} className="text-forest">
                  ← {adjacent.previous.title}
                </Link>
              ) : (
                <span />
              )}
              {adjacent.next ? (
                <Link href={adjacent.next.href} className="text-right text-forest">
                  {adjacent.next.title} →
                </Link>
              ) : null}
            </div>
            {related.length > 0 ? (
              <div className="mt-8">
                <h2 className="font-heading text-lg font-semibold text-forest">Related</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-forest">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-10 rounded-lg bg-sage p-5">
              <h2 className="font-heading text-lg font-semibold text-forest">Still need help?</h2>
              <p className="mt-2 text-sm text-muted">
                Theme product support is for merchants using a DEVS theme. Custom development is a separate enquiry.
              </p>
              <div className="mt-4">
                <ButtonLink href="/support">Theme support</ButtonLink>
              </div>
            </div>
          </article>
          <aside className="lg:col-span-3">
            <div className="hidden lg:block">
              <DocSearch records={records} placeholder={`Search ${theme.name} docs`} />
            </div>
            <div className="mt-8 hidden lg:block">
              <TableOfContents headings={article.headings} />
            </div>
            <div className="mt-8 lg:hidden">
              <DocSidebar themeName={theme.name} groups={groups} currentHref={article.href} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
