export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="divide-y divide-stone border-y border-stone">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="cursor-pointer list-none font-heading text-lg font-medium text-forest marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span aria-hidden="true" className="mt-1 font-mono text-copper group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="mt-1 hidden font-mono text-copper group-open:inline">
                −
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
