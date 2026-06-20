export default function PriorityBadge({ priority }) {
  const dot =
    priority === "high"
      ? "bg-[color:var(--accent)]"
      : priority === "medium"
        ? "bg-[var(--foreground)]"
        : "bg-[color:var(--secondary)]";
  return (
    <span className="inline-flex items-center gap-2 border border-foreground bg-surface px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.14em]">
      <span className={`inline-block h-2 w-2 ${dot}`} />
      {priority}
    </span>
  );
}
