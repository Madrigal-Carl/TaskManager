import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@validators/task.validator";
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
  isLoading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      priority: initial?.priority?.toLowerCase() ?? "medium",
      dueDate: initial?.dueDate?.slice(0, 10) ?? "",
    },
  });

  function onValid(data) {
    onSubmit({
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
    });
  }

  return (
    <ModalShell onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-5">
        <Field label="Task Title" error={errors.title?.message}>
          <input
            {...register("title")}
            placeholder="e.g. Review Q4 roadmap"
            className="h-12 w-full border border-foreground bg-surface px-4 text-[0.95rem] outline-none"
          />
        </Field>
        <Field label="Description" error={errors.description?.message}>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Add a short description"
            className="w-full resize-none border border-foreground bg-surface p-4 text-[0.95rem] outline-none"
          />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Priority" error={errors.priority?.message}>
            <div className="relative">
              <select
                {...register("priority")}
                className="h-12 w-full appearance-none border border-foreground bg-surface px-4 pr-10 text-[0.95rem] outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]"
              />
            </div>
          </Field>
          <Field label="Due Date" error={errors.dueDate?.message}>
            <input
              type="date"
              {...register("dueDate")}
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
            {isLoading ? "Saving…" : submitLabel}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
