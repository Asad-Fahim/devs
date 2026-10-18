import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { projects } from "@/data/work";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected Shopify work from DEVS. Case studies are published only when project details can be shared accurately.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <PageHeader
        eyebrow="Work"
        title="Selected work"
        lede="This page is a catalog of verified projects. It stays short until there is something accurate to publish — no invented clients, logos, testimonials, or metrics."
      />
      <section className="container-shell py-14">
        {projects.length === 0 ? (
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold text-forest">Nothing listed yet</h2>
            <p className="mt-3 text-muted">
              Typical engagements include theme customization, custom sections, storefront implementation, and
              performance or accessibility work on Shopify. When a project can be described with real context and
              screenshots, it will appear here and at a dedicated URL.
            </p>
            <p className="mt-3 text-muted">
              If you have a store that needs that kind of work, the enquiry form is the right next step.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact">Discuss a project</ButtonLink>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block bg-white rounded-2xl border border-stone/30 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 no-underline"
              >
                {/* Image */}
                {project.screenshots.length > 0 && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.screenshots[0].src}
                      alt={project.screenshots[0].alt}
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-forest mb-2">
                    {project.title}
                  </h2>
                  <p className="text-muted mb-4">{project.summary}</p>

                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-stone bg-sage/40 px-3 py-1 text-sm text-forest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
