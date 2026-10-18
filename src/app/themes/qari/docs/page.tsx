import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Qari Documentation",
  description: "Complete documentation for the Qari Shopify theme. Installation, setup, and customization guides.",
  path: "/themes/qari/docs",
});

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <div className="space-y-6">
        <h3 className="font-heading text-2xl font-semibold text-forest">Installation</h3>
        <ol className="list-decimal list-inside space-y-3 text-muted">
          <li>Download the .zip file from your purchase receipt.</li>
          <li>Log into your Shopify Admin, go to Online Store, then Themes.</li>
          <li>Click Add theme, then Upload zip file and select the Qari .zip.</li>
          <li>Once uploaded, click Publish to make it live.</li>
        </ol>

        <h3 className="font-heading text-2xl font-semibold text-forest mt-8">Previewing</h3>
        <p className="text-muted">
          Before publishing, click Customize on the unpublished Qari theme to preview it. This allows you to make changes safely without affecting your live store.
        </p>

        <h3 className="font-heading text-2xl font-semibold text-forest mt-8">Duplicating (Highly Recommended)</h3>
        <p className="text-muted">
          Before making major changes, duplicate the theme: Actions (...), then Duplicate. This ensures you always have a safe backup of your current settings.
        </p>
      </div>
    ),
  },
  {
    id: "theme-settings",
    title: "Theme Settings",
    content: (
      <div className="space-y-6">
        <p className="text-muted">
          Click the Gear icon (Theme settings) in the left sidebar of the Theme Editor.
        </p>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Logo</h4>
          <p className="text-muted">
            Upload your store logo. You can set a different width for desktop and mobile.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Typography</h4>
          <p className="text-muted">
            Choose your display (headings), body, and mono (labels) fonts. Qari defaults to Spectral and IBM Plex Sans. Adjust the base text size if needed.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Colors</h4>
          <p className="text-muted">
            Define your brand palette. Adjust the Paper (background), Ink (text), and Moss (accent/buttons) colors. Ensure high contrast for readability.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Cart Behavior</h4>
          <p className="text-muted">
            Choose between Drawer (slides in from the right) or Page (redirects to a full cart page).
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Custom Cursor</h4>
          <p className="text-muted">
            Toggle this on and upload a .png with transparency (max 32x32px) to replace the default mouse cursor (desktop only).
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "sections-guide",
    title: "Sections & Blocks",
    content: (
      <div className="space-y-6">
        <p className="text-muted">
          Every page in Qari is built using sections. Click Add section in the Theme Editor to add new ones.
        </p>

        <h3 className="font-heading text-2xl font-semibold text-forest">Key Homepage Sections</h3>

        <div className="space-y-4">
          <div className="border-b border-stone pb-4">
            <h4 className="font-heading text-lg font-semibold text-forest mb-2">Editorial Hero</h4>
            <p className="text-muted">
              Displays a large headline and floating book covers. Settings: Background color, text alignment, floating book blocks (requires product selection).
            </p>
          </div>

          <div className="border-b border-stone pb-4">
            <h4 className="font-heading text-lg font-semibold text-forest mb-2">Mood Discovery</h4>
            <p className="text-muted">
              A grid of clickable cards with icons. Settings: Grid columns, icon size, background color. Blocks: Mood icon, heading, link to a collection.
            </p>
          </div>

          <div className="border-b border-stone pb-4">
            <h4 className="font-heading text-lg font-semibold text-forest mb-2">Featured Books</h4>
            <p className="text-muted">
              A carousel of products from a specific collection. Settings: Choose collection, products per slide, autoplay toggle.
            </p>
          </div>

          <div className="border-b border-stone pb-4">
            <h4 className="font-heading text-lg font-semibold text-forest mb-2">FAQ (Magazine Index)</h4>
            <p className="text-muted">
              A unique numbered accordion section. Settings: Eyebrow, heading, hover text (default "Read answer"). Blocks: Question text, Rich Text answer.
            </p>
          </div>

          <div className="border-b border-stone pb-4">
            <h4 className="font-heading text-lg font-semibold text-forest mb-2">Store Values</h4>
            <p className="text-muted">
              A 3-column grid highlighting brand values (e.g., Handpicked, Sustainable). Blocks: Icon, Title, Description.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "page-setup",
    title: "Page Setup",
    content: (
      <div className="space-y-6">
        <p className="text-muted">
          To utilize Qari's custom templates (like About or FAQ):
        </p>
        <ol className="list-decimal list-inside space-y-3 text-muted">
          <li>Go to Online Store, then Pages in your Admin and click Add page.</li>
          <li>Name the page (e.g., "FAQ").</li>
          <li>On the right sidebar under Theme template, select the corresponding template (e.g., page.faq).</li>
          <li>Click Save.</li>
          <li>Go back to the Theme Editor, navigate to that page, and start adding sections.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "content-requirements",
    title: "Content Requirements",
    content: (
      <div className="space-y-6">
        <p className="text-muted">
          To keep the editorial layout looking pristine:
        </p>

        <ul className="list-disc list-inside space-y-3 text-muted">
          <li>
            <strong>Product Images:</strong> 1:1 ratio (square) or 3:4 ratio (portrait). Minimum 1200x1600px. Use PNGs with transparent or soft backgrounds for "floating" effects.
          </li>
          <li>
            <strong>Hero Images:</strong> 16:9 ratio (1920x1080px). Keep text overlays short.
          </li>
          <li>
            <strong>Text Limits:</strong> Headings should be under 8 words. Descriptions under 30 words.
          </li>
          <li>
            <strong>Metafields:</strong> To use the Book Author feature, ensure your products have the Vendor field filled out.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "integrations",
    title: "Integrations",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Search & Discovery (Required for Product Filtering)</h4>
          <p className="text-muted">
            Install Shopify's free "Search & Discovery" app to enable collection filters and related products.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Apps</h4>
          <p className="text-muted">
            Qari supports App Blocks and App Embeds natively. Go to Theme Settings, then App Embeds to toggle installed apps.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting & FAQs",
    content: (
      <div className="space-y-6">
        <ul className="space-y-4 text-muted">
          <li>
            <strong>Dropdown menu not working:</strong> Ensure your menu has nested links. In Shopify Admin, then Navigation, drag a link slightly to the right to make it a dropdown child.
          </li>
          <li>
            <strong>Cart drawer not opening:</strong> Go to Theme Settings, then Cart and ensure "Drawer" is selected. If using a third-party app for cart, disable it.
          </li>
          <li>
            <strong>Images look blurry:</strong> Ensure you are uploading images at least 1200px wide. The theme automatically scales them down.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "support-updates",
    title: "Support and Updates",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Support</h4>
          <p className="text-muted">
            For assistance, email mohammadasad.contact@gmail.com. Include your store URL and a screenshot of the issue.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Scope</h4>
          <p className="text-muted">
            Support covers bug fixes for the theme's core features.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-forest mb-2">Changelog</h4>
          <p className="text-muted">
            v1.0.0 (October 2026): Initial release.
          </p>
        </div>
      </div>
    ),
  },
];

export default function QariDocsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Documentation"
        title="Qari Theme Documentation"
        lede="Complete guide to installing, configuring, and customizing the Qari Shopify theme."
      />

      <div className="container-shell py-14">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="lg:block">
              <h3 className="font-heading text-sm font-semibold text-forest mb-4">Contents</h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-sm text-muted hover:text-forest transition-colors"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content Area */}
          <div className="space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-heading text-3xl font-semibold text-forest mb-6">{section.title}</h2>
                <div className="prose-docs">{section.content}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
