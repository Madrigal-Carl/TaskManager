import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex h-10 items-center gap-1 border border-foreground bg-surface px-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] disabled:opacity-40"
      >
        <ChevronLeft size={14} /> Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={
            p === page
              ? "h-10 w-10 border border-foreground bg-[color:var(--foreground)] text-[color:var(--surface)] text-[0.8rem] font-bold"
              : "h-10 w-10 border border-foreground bg-surface text-[0.8rem] font-medium transition-colors hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]"
          }
        >
          {p}
        </button>
      ))}
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
