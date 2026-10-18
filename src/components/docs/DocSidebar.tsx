import Link from "next/link";
import type { DocArticle } from "@/lib/docs";
import { cx } from "@/lib/utils";

export function DocSidebar({
  themeName,
  groups,
  currentHref,
}: {
  themeName: string;
  groups: { section: string; items: DocArticle[] }[];
  currentHref: string;
}) {
  return (
    <nav aria-label={`${themeName} documentation`} className="text-sm">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">{themeName}</p>
      <div className="mt-4 space-y-6">
        {groups.map((group) => (
          <div key={group.section}>
            <p className="font-medium text-forest">{group.section}</p>
            <ul className="mt-2 space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx(
                      "block rounded-md px-2 py-1.5 no-underline hover:bg-sage",
                      currentHref === item.href ? "bg-sage text-forest" : "text-muted",
                    )}
                    aria-current={currentHref === item.href ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
