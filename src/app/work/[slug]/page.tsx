import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/data/work";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return buildMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/work/${slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${slug}` },
        ])}
      />

      {/* Hero Section */}
      {project.screenshots.length > 0 && (
        <section className="relative w-full aspect-video overflow-hidden">
          <Image
            src={project.screenshots[0].src}
            alt={project.screenshots[0].alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </section>
      )}

      <div className="container-shell py-14">
        {/* Project Header */}
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Case Study</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-forest md:text-5xl mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted mb-6">{project.summary}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.relatedServices.map((service) => (
              <span
                key={service}
                className="inline-flex items-center rounded-full border border-stone bg-sage/40 px-3 py-1 text-sm text-forest capitalize"
              >
                {service.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            <div>
              <span className="font-medium text-forest">Year:</span> {project.year}
            </div>
            <div>
              <span className="font-medium text-forest">Technologies:</span> {project.technologies.join(", ")}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-16 max-w-3xl space-y-16">
          {/* Context */}
          <section id="context" className="scroll-mt-24">
            <h2 className="font-heading text-3xl font-semibold text-forest mb-6">Context</h2>
            <div className="prose-docs">
              <p>{project.context}</p>
            </div>
          </section>

          {/* Challenge */}
          <section id="challenge" className="scroll-mt-24">
            <h2 className="font-heading text-3xl font-semibold text-forest mb-6">The Challenge</h2>
            <div className="prose-docs">
              <p>{project.challenge}</p>
            </div>
          </section>

          {/* Work Completed */}
          <section id="work-completed" className="scroll-mt-24">
            <h2 className="font-heading text-3xl font-semibold text-forest mb-6">Work Completed</h2>
            <div className="prose-docs">
              <ul className="space-y-2">
                {project.workCompleted.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Technologies */}
          <section id="technologies" className="scroll-mt-24">
            <h2 className="font-heading text-3xl font-semibold text-forest mb-6">Technologies</h2>
            <div className="prose-docs">
              <p>{project.technologies.join(", ")}</p>
            </div>
          </section>

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <section id="outcomes" className="scroll-mt-24">
              <h2 className="font-heading text-3xl font-semibold text-forest mb-6">Outcomes</h2>
              <div className="prose-docs">
                <ul className="space-y-2">
                  {project.outcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Screenshots */}
          {project.screenshots.length > 1 && (
            <section id="screenshots" className="scroll-mt-24">
              <h2 className="font-heading text-3xl font-semibold text-forest mb-6">Responsive Design</h2>
              <div className="grid gap-8 md:grid-cols-2 items-start">
                {/* Mobile Mockup */}
                {project.screenshots[1] && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-[280px] aspect-[9/19] overflow-hidden rounded-[2.5rem] border-8 border-forest shadow-2xl bg-forest">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-forest/50 rounded-full" />
                      <Image
                        src={project.screenshots[1].src}
                        alt={project.screenshots[1].alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <p className="mt-4 text-sm text-muted">Mobile View</p>
                  </div>
                )}

                {/* Tablet Mockup */}
                {project.screenshots[2] && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-xl border-8 border-forest shadow-2xl bg-forest">
                      <Image
                        src={project.screenshots[2].src}
                        alt={project.screenshots[2].alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <p className="mt-4 text-sm text-muted">Tablet View</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
