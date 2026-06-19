import { useState } from "react";
import ModalShell from "./ModalShell";
import { Field } from "@components/ui";
import { ChevronDown } from "lucide-react";

export default function TaskFormModal({
  title,
  submitLabel,
  initial,
  onClose,
  onSubmit,
}) {
  const [t, setT] = useState(initial?.title ?? "");
  const [d, setD] = useState(initial?.description ?? "");
  const [p, setP] = useState(initial?.priority ?? "Medium");
  const [due, setDue] = useState(initial?.dueDate ?? "");

  return (
    <ModalShell onClose={onClose} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!t.trim() || !due) return;
          onSubmit({
            title: t.trim(),
            description: d.trim(),
            priority: p,
            dueDate: due,
          });
        }}
        className="flex flex-col gap-5"
      >
        <Field label="Task Title">
          <input
            value={t}
            onChange={(e) => setT(e.target.value)}
            required
            placeholder="e.g. Review Q4 roadmap"
            className="h-12 w-full border border-foreground bg-surface px-4 text-[0.95rem] outline-none"
          />
        </Field>
        <Field label="Description">
          <textarea
            value={d}
            onChange={(e) => setD(e.target.value)}
            rows={4}
            placeholder="Add a short description"
            className="w-full resize-none border border-foreground bg-surface p-4 text-[0.95rem] outline-none"
          />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Priority">
            <div className="relative">
              <select
                value={p}
                onChange={(e) => setP(e.target.value)}
                className="h-12 w-full appearance-none border border-foreground bg-surface px-4 pr-10 text-[0.95rem] outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]"
              />
            </div>
          </Field>
          <Field label="Due Date">
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              required
              className="h-12 w-full border border-foreground bg-surface px-4 text-[0.95rem] outline-none"
            />
          </Field>
        </div>

        <div className="mt-2 flex flex-col-reverse gap-2 border-t border-foreground pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center border border-foreground bg-surface px-6 text-[0.9rem] font-medium uppercase tracking-[0.12em] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 text-[0.9rem] font-medium uppercase tracking-[0.12em] text-[color:var(--accent-foreground)] hover:bg-black hover:border-black"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
