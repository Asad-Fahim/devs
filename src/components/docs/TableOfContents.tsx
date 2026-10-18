export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: 2 | 3 }[];
}) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
      <ul className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
            <a href={`#${heading.id}`} className="text-muted no-underline hover:text-forest">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
