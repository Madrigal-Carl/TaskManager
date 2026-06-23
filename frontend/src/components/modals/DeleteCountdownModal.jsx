import { useEffect, useState } from "react";
import ModalShell from "./ModalShell";

export default function DeleteCountdownModal({
  title = "Delete Task",
  message,
  seconds = 5,
  onCancel,
  onProceed,
}) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count <= 0) {
      onProceed();
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onProceed]);

  return (
    <ModalShell onClose={onCancel} title={title}>
      <p className="text-[0.95rem] text-[var(--secondary)]">{message}</p>

      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="font-display text-[6rem] font-bold leading-none tabular-nums text-[var(--accent)]">
          {count}
        </span>
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.16em] text-[var(--secondary)]">
          seconds until deleted
        </p>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-2 border-t border-[var(--foreground)] pt-5 sm:flex-row sm:justify-end">
        <button
          onClick={onCancel}
          className="inline-flex h-12 items-center justify-center border border-[var(--foreground)] bg-[var(--surface)] px-6 text-[0.9rem] font-medium uppercase tracking-[0.12em] hover:bg-[var(--foreground)] hover:text-[var(--surface)]"
        >
          Undo
        </button>

        <button
          onClick={onProceed}
          className="inline-flex h-12 items-center justify-center border border-[var(--accent)] bg-[var(--accent)] px-6 text-[0.9rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-foreground)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)]"
        >
          Delete Now
        </button>
      </div>
    </ModalShell>
  );
}
