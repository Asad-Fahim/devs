import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="text-muted no-underline hover:text-forest">
                  {item.label}
                </Link>
              ) : (
                <span className="text-forest" aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-stone">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
