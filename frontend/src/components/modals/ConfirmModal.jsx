import ModalShell from "./ModalShell";

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  return (
    <ModalShell onClose={onCancel} title={title}>
      <p className="text-[0.95rem] text-[var(--secondary)]">{message}</p>
      <div className="mt-8 flex flex-col-reverse gap-2 border-t border-[var(--foreground)] pt-5 sm:flex-row sm:justify-end">
        <button
          onClick={onCancel}
          className="inline-flex h-12 items-center justify-center border border-[var(--foreground)] bg-[var(--surface)] px-6 text-[0.9rem] font-medium uppercase tracking-[0.12em] hover:bg-[var(--foreground)] hover:text-[var(--surface)]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="inline-flex h-12 items-center justify-center border border-[var(--accent)] bg-[var(--accent)] px-6 text-[0.9rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-foreground)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)]"
        >
          {confirmLabel}
        </button>
      </div>
    </ModalShell>
  );
}
