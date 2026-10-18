import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DocSearch } from "@/components/docs/DocSearch";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { Mdx } from "@/components/docs/Mdx";
import { StatusBadge } from "@/components/themes/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { getTheme, themes } from "@/data/themes";
import { getDoc, getDocNav, getSearchIndex } from "@/lib/docs";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

type Params = { theme: string };

export function generateStaticParams() {
  return themes.map((theme) => ({ theme: theme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { theme: themeSlug } = await params;
  const theme = getTheme(themeSlug);
  const article = getDoc(themeSlug, []);
  if (!theme) return {};
  return buildMetadata({
    title: article?.title ?? `${theme.name} documentation`,
    description: article?.description ?? theme.description,
    path: `/docs/${theme.slug}`,
    index: theme.status === "published" && !article?.draft,
  });
}

export default async function ThemeDocsHomePage({ params }: { params: Promise<Params> }) {
  const { theme: themeSlug } = await params;
  const theme = getTheme(themeSlug);
  const article = getDoc(themeSlug, []);
  if (!theme || !article) notFound();
  const groups = getDocNav(themeSlug);
  const records = getSearchIndex().filter((record) => record.themeSlug === themeSlug);

  return (
    <main className="border-b border-stone">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
          { name: theme.name, path: `/docs/${theme.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd(article.title, article.description, article.href, article.updated)}
      />
      <div className="container-shell py-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/docs", label: "Documentation" },
            { label: theme.name },
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <DocSidebar themeName={theme.name} groups={groups} currentHref={article.href} />
          </aside>
          <article className="lg:col-span-9">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-4xl font-semibold text-forest">{article.title}</h1>
              <StatusBadge status={theme.status} />
            </div>
            <p className="mt-4 max-w-2xl text-muted">{article.description}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {theme.version ? `Version ${theme.version}` : "No public version yet"}
              {article.updated ? ` · Updated ${formatDate(article.updated)}` : ""}
            </p>
            <div className="mt-6 max-w-xl">
              <DocSearch records={records} placeholder={`Search ${theme.name} docs`} />
            </div>
            <div className="prose-docs mt-8">
              <Mdx source={article.content} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/support">Still need help?</ButtonLink>
              <ButtonLink href={`/themes/${theme.slug}`} variant="secondary">
                Theme page
              </ButtonLink>
            </div>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {groups
                .flatMap((group) => group.items)
                .filter((item) => item.slug.length > 0)
                .map((item) => (
                  <li key={item.href} className="rounded-md border border-stone p-4">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">{item.section}</p>
                    <Link href={item.href} className="mt-1 block font-heading text-lg font-semibold text-forest no-underline">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </li>
                ))}
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
}
