import { X } from "lucide-react";

export default function ModalShell({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl border border-[var(--foreground)] bg-[var(--surface)]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-[var(--foreground)] p-6">
          <h3 className="font-display text-[1.5rem] font-bold leading-tight tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center border border-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--foreground)] hover:text-[var(--surface)]"
          >
            <X size={14} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
