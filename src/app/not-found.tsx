import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="container-shell py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-forest">This page is not here.</h1>
      <p className="mt-4 max-w-xl text-muted">
        The URL may have changed, or the page does not exist yet. Try the services overview, theme catalog, or
        documentation home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/docs" variant="secondary">
          Documentation
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Discuss a project
        </ButtonLink>
      </div>
    </main>
  );
}
