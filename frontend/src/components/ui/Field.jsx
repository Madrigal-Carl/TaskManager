export default function Field({ label, children, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[color:var(--secondary)]">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[0.8rem] text-[color:var(--primary)]">{error}</p>
      )}
    </div>
  );
}
