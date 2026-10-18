import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-forest">
        {label}
        {required ? (
          <span className="text-danger">
            {" "}
            *
            <span className="sr-only"> required</span>
          </span>
        ) : (
          <span className="ml-1 font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const controlClass = (error?: string) =>
  cx(
    "w-full rounded-md border bg-paper px-3 py-2.5 text-graphite",
    error ? "border-danger" : "border-stone",
  );
