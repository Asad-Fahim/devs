export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="border-b border-stone bg-paper">
      <div className="container-shell py-12 md:py-16">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-forest md:text-5xl">
          {title}
        </h1>
        {lede ? <p className="mt-5 max-w-2xl text-lg text-muted">{lede}</p> : null}
      </div>
    </header>
  );
}
