"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { SearchRecord } from "@/lib/docs";

function scoreRecord(record: SearchRecord, query: string): number {
  const q = query.toLowerCase();
  const title = record.title.toLowerCase();
  const description = record.description.toLowerCase();
  const text = record.text.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (description.includes(q)) return 40;
  if (text.includes(q)) return 20;
  return 0;
}

export function DocSearch({
  records,
  placeholder = "Search documentation",
}: {
  records: SearchRecord[];
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];
    return records
      .map((record) => ({ record, score: scoreRecord(record, trimmed) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((item) => item.record);
  }, [query, records]);

  useEffect(() => {
    setActive(0);
    setOpen(query.trim().length >= 2);
  }, [query]);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={inputId} className="sr-only">
        Search documentation
      </label>
      <div className="flex items-center gap-2 rounded-md border border-stone bg-paper px-3">
        <Search size={16} className="text-muted" aria-hidden="true" />
        <input
          id={inputId}
          type="search"
          role="combobox"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => query.trim().length >= 2 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          className="w-full border-0 bg-transparent py-2.5 text-sm text-graphite outline-none"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((value) => Math.max(value - 1, 0));
            } else if (event.key === "Escape") {
              setOpen(false);
            } else if (event.key === "Enter" && open && results[active]) {
              event.preventDefault();
              window.location.assign(results[active].href);
            }
          }}
        />
      </div>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border border-stone bg-paper shadow-soft"
        >
          {results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">No matching guides. Try a setting name or a shorter phrase.</li>
          ) : (
            results.map((result, index) => (
              <li key={result.href} role="option" aria-selected={index === active}>
                <Link
                  href={result.href}
                  className={`block px-3 py-2.5 no-underline ${index === active ? "bg-sage" : ""}`}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className="block font-medium text-forest">{result.title}</span>
                  <span className="block text-xs text-muted">
                    {result.themeName} · {result.section}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
