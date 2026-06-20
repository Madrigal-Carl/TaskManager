import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageRange(page, totalPages) {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (page >= totalPages - 3)
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

export default function Pagination({ page, totalPages, onChange }) {
  const range = getPageRange(page, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex h-10 items-center gap-1 border border-foreground bg-surface px-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] disabled:opacity-40"
      >
        <ChevronLeft size={14} /> Prev
      </button>

      <span className="flex sm:hidden h-10 items-center border border-foreground bg-surface px-4 text-[0.8rem] font-medium">
        {page} / {totalPages}
      </span>

      {range.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-[0.8rem] text-[color:var(--secondary)]"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`hidden sm:inline-flex h-10 w-10 items-center justify-center border border-foreground text-[0.8rem] font-medium ${
              p === page
                ? "bg-[color:var(--foreground)] text-[color:var(--surface)] font-bold"
                : "bg-surface transition-colors hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex h-10 items-center gap-1 border border-foreground bg-surface px-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] disabled:opacity-40"
      >
        Next <ChevronRight size={14} />
      </button>
    </nav>
  );
}
