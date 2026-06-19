export default function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[color:var(--secondary)]">
        {label}
      </span>
      {children}
    </label>
  );
}
