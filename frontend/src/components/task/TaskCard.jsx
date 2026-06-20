import { Check, Circle, Pencil, Trash2, Dot } from "lucide-react";
import { formatDate } from "@lib/utils";
import { PriorityBadge, StatusBadge } from "@components/badges";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onMarkComplete,
  onMarkIncomplete,
}) {
  const isCompleted = task.status === "complete";
  return (
    <li className="group grid grid-cols-1 gap-6 border border-foreground bg-surface p-6 transition-colors hover:bg-[#FAFAFA] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--foreground)] lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="flex items-start gap-4">
          <Dot
            size={38}
            className=" mt-1 hidden text-[color:var(--secondary)] sm:block"
          />
          <div className="min-w-0">
            <h3
              className={`font-display text-[1.125rem] font-bold leading-snug tracking-tight ${
                isCompleted ? "line-through opacity-60" : ""
              }`}
            >
              {task.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-[0.95rem] text-[color:var(--secondary)]">
              {task.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
          <span className="border border-foreground bg-surface px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.14em]">
            Due {formatDate(task.dueDate)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button
            onClick={onMarkComplete}
            aria-label="Mark as complete"
            className="grid h-10 w-10 place-items-center border border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-black hover:border-black"
          >
            <Check size={14} strokeWidth={2.5} />
          </button>
          <button
            onClick={onMarkIncomplete}
            aria-label="Mark as incomplete"
            className="grid h-10 w-10 place-items-center border border-foreground bg-surface hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]"
          >
            <Circle size={14} strokeWidth={2.5} />
          </button>
          <button
            onClick={onEdit}
            aria-label="Edit task"
            className="grid h-10 w-10 place-items-center border border-foreground bg-surface hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete task"
            className="grid h-10 w-10 place-items-center border border-foreground bg-surface hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
