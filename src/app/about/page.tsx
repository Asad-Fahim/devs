import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "DEVS is an independent Shopify development studio: storefront engineering, theme products, documentation, and support.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="About"
        title="An independent Shopify studio"
        lede="DEVS exists to build, customize, and support Shopify storefronts with care — and to ship themes that merchants can actually run."
      />
      <article className="container-shell max-w-3xl space-y-8 py-14">
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Philosophy</h2>
          <p className="mt-3 text-muted">
            Most ecommerce problems are specific: a collection page that hides the product, a section that marketing
            cannot edit, a theme that was customized until it could not be updated. The useful response is precise
            engineering, not a slogan about being the leading agency.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Shopify, on purpose</h2>
          <p className="mt-3 text-muted">
            The studio focuses on Shopify storefronts: Liquid themes, Online Store 2.0 sections, product and
            collection templates, and the unglamorous work of making those things maintainable. DEVS is not a Shopify
            Partner claim on this website, and it is not affiliated with or endorsed by Shopify Inc.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Engineering and storefront UX</h2>
          <p className="mt-3 text-muted">
            A storefront has to hold up on a phone, remain editable in the theme editor, and stay understandable six
            months later. That means semantic templates, restrained JavaScript, and settings that match how merchants
            actually change content.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Documentation and support</h2>
          <p className="mt-3 text-muted">
            Theme products are not finished when the ZIP is uploaded. Each DEVS theme is expected to ship with
            documentation, a changelog, and a support path that is distinct from paid client work. If a guide would
            be guesswork, it is marked as a draft instead of published as fact.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">How collaboration works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
            <li>A written brief and access to a preview theme, never to production first.</li>
            <li>A scoped estimate before implementation.</li>
            <li>Review in Shopify’s theme preview, not in a vacuum.</li>
            <li>Handover notes so the store is not dependent on informal memory.</li>
          </ol>
        </section>
        <div className="pt-4">
          <ButtonLink href="/contact">Discuss a project</ButtonLink>
        </div>
      </article>
    </main>
  );
}
