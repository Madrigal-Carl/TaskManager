export default function StatusBadge({ status }) {
  if (status === "complete") {
    return (
      <span className="inline-flex items-center border border-[var(--accent)] bg-[var(--accent)] px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-foreground)]">
        Completed
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center border border-dashed border-[var(--secondary)] bg-[var(--surface)] px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--secondary)]">
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center border border-[var(--foreground)] bg-[var(--foreground)] px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-foreground)]">
      Incomplete
    </span>
  );
}
