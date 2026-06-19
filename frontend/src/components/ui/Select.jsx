import { ChevronRight } from "lucide-react";

export default function Select({ value, onChange, options, label, className }) {
  return (
    <div className={className}>
      <label className="sr-only">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none border border-foreground bg-surface px-4 pr-10 text-[0.95rem] outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {label}: {o}
            </option>
          ))}
        </select>
        <ChevronRight
          size={14}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-foreground"
        />
      </div>
    </div>
  );
}
