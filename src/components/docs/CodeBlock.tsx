import type { ReactNode } from "react";
import { CopyButton } from "@/components/docs/CopyButton";

export function CodeBlock({ children }: { children?: ReactNode }) {
  const text = extractText(children).replace(/\n$/, "");
  return (
    <div className="group relative my-5 overflow-x-auto rounded-md border border-forest-mid bg-forest-deep">
      <CopyButton text={text} />
      <pre className="overflow-x-auto p-4 pt-12 font-mono text-[0.85rem] leading-relaxed text-sage">
        <code>{text}</code>
      </pre>
    </div>
  );
}

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return extractText(props?.children);
  }
  return "";
}
