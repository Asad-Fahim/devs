import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type Tone = "note" | "warning" | "preview";

const tones: Record<Tone, string> = {
  note: "border-stone bg-sage",
  warning: "border-copper/40 bg-paper-shade",
  preview: "border-copper/50 bg-paper-shade",
};

export function Callout({
  title,
  tone = "note",
  children,
}: {
  title?: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <aside className={cx("my-6 rounded-md border px-4 py-3 text-sm text-graphite", tones[tone])}>
      {title ? <p className="font-heading font-semibold text-forest">{title}</p> : null}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </aside>
  );
}
