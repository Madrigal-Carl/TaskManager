export default function KpiCard({ label, value }) {
  return (
    <div className="flex flex-col justify-between border border-foreground bg-surface p-5">
      <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[color:var(--secondary)]">
        {label}
      </p>
      <p className="font-display mt-6 text-[2.5rem] font-bold leading-none tracking-tight">
        {value.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
