import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "@/lib/utils";
import { getTheme } from "@/data/themes";

const CONTENT_ROOT = path.join(process.cwd(), "content", "themes");

export type DocFrontmatter = {
  title: string;
  description: string;
  section?: string;
  order?: number;
  updated?: string;
  draft?: boolean;
};

export type DocArticle = {
  themeSlug: string;
  slug: string[];
  href: string;
  title: string;
  description: string;
  section: string;
  order: number;
  updated?: string;
  draft: boolean;
  content: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

export type SearchRecord = {
  themeSlug: string;
  themeName: string;
  href: string;
  title: string;
  description: string;
  section: string;
  text: string;
};

function readDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

function collectMdxFiles(dir: string, prefix: string[] = []): string[][] {
  const entries = readDirSafe(dir);
  const files: string[][] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files.push(...collectMdxFiles(full, [...prefix, entry]));
    } else if (entry.endsWith(".mdx") || entry.endsWith(".md")) {
      const name = entry.replace(/\.mdx?$/, "");
      files.push([...prefix, name]);
    }
  }
  return files;
}

function parseHeadings(content: string): { id: string; text: string; level: 2 | 3 }[] {
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  const seen = new Map<string, number>();
  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].replace(/[#*`]/g, "").trim();
    let id = slugify(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    headings.push({ id, text, level });
  }
  return headings;
}

function mdxToSearchText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getThemeSlugsWithDocs(): string[] {
  return readDirSafe(CONTENT_ROOT).filter((entry) => {
    const full = path.join(CONTENT_ROOT, entry);
    return fs.statSync(full).isDirectory();
  });
}

export function getThemeArticles(themeSlug: string): DocArticle[] {
  const dir = path.join(CONTENT_ROOT, themeSlug);
  if (!fs.existsSync(dir)) return [];
  const files = collectMdxFiles(dir);
  const articles = files.map((slugParts) => {
    const filePath = path.join(dir, `${slugParts.join("/")}.mdx`);
    const mdPath = path.join(dir, `${slugParts.join("/")}.md`);
    const sourcePath = fs.existsSync(filePath) ? filePath : mdPath;
    const raw = fs.readFileSync(sourcePath, "utf8");
    const { data, content } = matter(raw);
    const fm = data as Partial<DocFrontmatter>;
    const isIndex = slugParts.length === 1 && slugParts[0] === "index";
    const slug = isIndex ? [] : slugParts;
    const href = isIndex ? `/docs/${themeSlug}` : `/docs/${themeSlug}/${slugParts.join("/")}`;
    return {
      themeSlug,
      slug,
      href,
      title: fm.title ?? slugParts[slugParts.length - 1] ?? themeSlug,
      description: fm.description ?? "",
      section: fm.section ?? (isIndex ? "Overview" : "Guides"),
      order: typeof fm.order === "number" ? fm.order : 99,
      updated: fm.updated,
      draft: Boolean(fm.draft),
      content,
      headings: parseHeadings(content),
    } satisfies DocArticle;
  });
  return articles.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getDoc(themeSlug: string, slug: string[]): DocArticle | undefined {
  const articles = getThemeArticles(themeSlug);
  const key = slug.join("/");
  return articles.find((article) => article.slug.join("/") === key);
}

export function getDocNav(themeSlug: string): { section: string; items: DocArticle[] }[] {
  const articles = getThemeArticles(themeSlug).filter((article) => article.slug.length > 0 || article.href === `/docs/${themeSlug}`);
  const groups = new Map<string, DocArticle[]>();
  for (const article of articles) {
    const list = groups.get(article.section) ?? [];
    list.push(article);
    groups.set(article.section, list);
  }
  return Array.from(groups.entries()).map(([section, items]) => ({
    section,
    items: items.sort((a, b) => a.order - b.order),
  }));
}

export function getAdjacentArticles(themeSlug: string, href: string): { previous?: DocArticle; next?: DocArticle } {
  const articles = getThemeArticles(themeSlug).filter((article) => article.slug.length > 0);
  const index = articles.findIndex((article) => article.href === href);
  if (index < 0) return {};
  return {
    previous: articles[index - 1],
    next: articles[index + 1],
  };
}

export function getSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];
  for (const themeSlug of getThemeSlugsWithDocs()) {
    const theme = getTheme(themeSlug);
    const themeName = theme?.name ?? themeSlug;
    for (const article of getThemeArticles(themeSlug)) {
      records.push({
        themeSlug,
        themeName,
        href: article.href,
        title: article.title,
        description: article.description,
        section: article.section,
        text: mdxToSearchText(article.content).slice(0, 4000),
      });
    }
  }
  return records;
}

export function getIndexedDocsForSitemap(): DocArticle[] {
  const articles: DocArticle[] = [];
  for (const themeSlug of getThemeSlugsWithDocs()) {
    const theme = getTheme(themeSlug);
    if (!theme || theme.status !== "published") continue;
    for (const article of getThemeArticles(themeSlug)) {
      if (!article.draft) articles.push(article);
    }
  }
  return articles;
}
