import type { ReactNode } from "react";
import Link from "next/link";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";

const styles: Record<Variant, string> = {
  primary:
    "bg-forest text-paper hover:bg-forest-mid border border-forest",
  secondary:
    "bg-transparent text-forest border border-forest hover:bg-sage",
  ghost: "bg-transparent text-forest hover:bg-sage border border-transparent",
  "on-dark": "bg-paper text-forest hover:bg-sage border border-paper",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium no-underline transition-colors",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
