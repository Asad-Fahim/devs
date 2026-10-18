import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { getPublishedThemes } from "@/data/themes";
import { getIndexedDocsForSitemap } from "@/lib/docs";
import { projects } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const staticPaths = ["/", "/services", "/work", "/themes", "/docs", "/support", "/contact", "/about", "/privacy"];
  const servicePaths = services.map((service) => `/services/${service.slug}`);
  const publishedThemes = getPublishedThemes();
  const themePaths = publishedThemes.flatMap((theme) => [`/themes/${theme.slug}`, theme.documentationPath]);
  const docPaths = getIndexedDocsForSitemap().map((article) => article.href);
  const workPaths = projects.map((project) => `/work/${project.slug}`);

  return [...staticPaths, ...servicePaths, ...themePaths, ...docPaths, ...workPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));
}
