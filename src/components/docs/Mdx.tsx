import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { slugify } from "@/lib/utils";

const components = {
  Callout,
  pre: ({ children }: { children?: ReactNode }) => <CodeBlock>{children}</CodeBlock>,
  h2: ({ children }: { children?: ReactNode }) => {
    const text = stringify(children);
    return (
      <h2 id={slugify(text)} className="font-heading text-forest">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children?: ReactNode }) => {
    const text = stringify(children);
    return (
      <h3 id={slugify(text)} className="font-heading text-forest">
        {children}
      </h3>
    );
  },
};

function stringify(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(stringify).join("");
  return "";
}

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
