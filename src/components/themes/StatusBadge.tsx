import { cx } from "@/lib/utils";
import type { ThemeStatus } from "@/data/themes";

export function StatusBadge({ status }: { status: ThemeStatus }) {
  const label = status === "published" ? "Theme Store" : "In development";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
        status === "published" ? "bg-success-bg text-success" : "bg-copper/10 text-copper border border-copper/30",
      )}
    >
      {label}
    </span>
  );
}
