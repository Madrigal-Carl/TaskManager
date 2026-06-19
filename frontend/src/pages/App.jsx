import { useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Circle,
} from "lucide-react";
import { Field, KpiCard, Select, Pagination } from "@components/ui";
import TaskCard from "@components/task/TaskCard";
import { ConfirmModal, TaskFormModal } from "@components/modals";

const seedTasks = [
  {
    id: "1",
    title: "Finalize Q4 product roadmap",
    description:
      "Consolidate feedback from design, engineering and growth into a single shared document for the leadership review.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-06-22",
  },
  {
    id: "2",
    title: "Review onboarding flow analytics",
    description:
      "Audit funnel drop-off between step 2 and 3, identify the highest-impact friction point and draft two A/B test hypotheses.",
    priority: "Medium",
    status: "Incomplete",
    dueDate: "2026-06-25",
  },
  {
    id: "3",
    title: "Ship dark mode toggle",
    description:
      "Implement system-aware theme switching across the dashboard, including persistence and updated brand tokens.",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-06-10",
  },
  {
    id: "4",
    title: "Migrate billing service to v2 API",
    description:
      "Replace deprecated endpoints, add retries with exponential backoff, and re-run the regression suite end to end.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-06-30",
  },
  {
    id: "5",
    title: "Write design system contribution guide",
    description:
      "Document the component proposal process, review checklist and accessibility requirements for cross-team contributors.",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-06-08",
  },
  {
    id: "6",
    title: "Interview three platform engineering candidates",
    description:
      "Coordinate scheduling, share scorecards in advance, and submit feedback within 24 hours of each loop.",
    priority: "Low",
    status: "Incomplete",
    dueDate: "2026-07-02",
  },
  {
    id: "7",
    title: "Plan customer advisory board agenda",
    description:
      "Draft topics, send pre-reads, and align with sales on the three accounts we want to highlight live.",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-07-05",
  },
];

const PAGE_SIZE = 5;

export default function App() {
  const [tasks, setTasks] = useState(seedTasks);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [addOpen, setAddOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [markCompleteTask, setMarkCompleteTask] = useState(null);
  const [markIncompleteTask, setMarkIncompleteTask] = useState(null);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const q = query.trim().toLowerCase();
      if (
        q &&
        !t.title.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q)
      )
        return false;
      if (priorityFilter !== "All" && t.priority !== priorityFilter)
        return false;
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      return true;
    });
  }, [tasks, query, priorityFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "Pending").length,
      incomplete: tasks.filter((t) => t.status === "Incomplete").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
    }),
    [tasks],
  );

  function handleCreate(data) {
    setTasks((t) => [
      { ...data, id: crypto.randomUUID(), status: "Pending" },
      ...t,
    ]);
    setAddOpen(false);
  }

  function handleUpdate(updated) {
    setTasks((t) => t.map((x) => (x.id === updated.id ? updated : x)));
    setEditTask(null);
  }

  function handleDelete(id) {
    setTasks((t) => t.filter((x) => x.id !== id));
    setDeleteTask(null);
  }

  function handleMarkComplete(id) {
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, status: "Completed" } : x)),
    );
    setMarkCompleteTask(null);
  }

  function handleMarkIncomplete(id) {
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, status: "Incomplete" } : x)),
    );
    setMarkIncompleteTask(null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        {/* HEADER */}
        <header className="grid grid-cols-1 gap-10 border-b border-foreground pb-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[color:var(--secondary)]">
              Dashboard · 001
            </p>
            <h1 className="font-display mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight lg:text-[4rem]">
              Task Manager
            </h1>
            <p className="mt-4 max-w-md text-[0.95rem] text-[color:var(--secondary)]">
              Organize and track your daily tasks.
            </p>
          </div>

          <div className="hidden lg:col-span-1 lg:flex lg:items-stretch lg:justify-center">
            <div className="h-full w-px bg-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-6">
            <KpiCard label="Total Tasks" value={stats.total} />
            <KpiCard label="Pending" value={stats.pending} />
            <KpiCard label="Incomplete" value={stats.incomplete} />
            <KpiCard label="Completed" value={stats.completed} />
          </div>
        </header>

        {/* SEARCH + FILTERS */}
        <section className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--secondary)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search tasks by title or description"
              className="h-12 w-full border border-foreground bg-surface pl-11 pr-4 text-[0.95rem] outline-none placeholder:text-[color:var(--secondary)] focus:border-foreground"
            />
          </div>
          <Select
            className="lg:col-span-2"
            value={priorityFilter}
            onChange={(v) => {
              setPriorityFilter(v);
              setPage(1);
            }}
            options={["All", "Low", "Medium", "High"]}
            label="Priority"
          />
          <Select
            className="lg:col-span-3"
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            options={["All", "Pending", "Incomplete", "Completed"]}
            label="Status"
          />
        </section>

        {/* ADD TASK */}
        <div className="mt-6">
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 text-[0.95rem] font-medium text-[color:var(--accent-foreground)] transition-colors hover:bg-black hover:border-black sm:w-auto"
          >
            <Plus size={16} strokeWidth={2.25} />
            Add New Task
          </button>
        </div>

        {/* TASK LIST */}
        <section className="mt-8">
          <div className="mb-4 flex items-baseline justify-between border-b border-foreground pb-3">
            <h2 className="font-display text-[1.25rem] font-bold tracking-tight">
              Tasks
            </h2>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-[color:var(--secondary)]">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>
          </div>

          {pageItems.length === 0 ? (
            <div className="border border-foreground bg-surface p-12 text-center">
              <p className="font-display text-xl font-bold">No tasks found</p>
              <p className="mt-2 text-[0.95rem] text-[color:var(--secondary)]">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {pageItems.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  onEdit={() => setEditTask(t)}
                  onDelete={() => setDeleteTask(t)}
                  onMarkComplete={() => setMarkCompleteTask(t)}
                  onMarkIncomplete={() => setMarkIncompleteTask(t)}
                />
              ))}
            </ul>
          )}
        </section>

        {/* PAGINATION */}
        {filtered.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}

        <footer className="mt-16 border-t border-foreground pt-6 text-[0.75rem] uppercase tracking-[0.16em] text-[color:var(--secondary)]">
          Task Manager · Swiss Grid System
        </footer>
      </div>

      {/* MODALS */}
      {addOpen && (
        <TaskFormModal
          title="Add New Task"
          submitLabel="Create Task"
          onClose={() => setAddOpen(false)}
          onSubmit={(d) => handleCreate(d)}
        />
      )}
      {editTask && (
        <TaskFormModal
          title="Edit Task"
          submitLabel="Save Changes"
          initial={editTask}
          onClose={() => setEditTask(null)}
          onSubmit={(d) => handleUpdate({ ...editTask, ...d })}
        />
      )}
      {deleteTask && (
        <ConfirmModal
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteTask.title}"? This action cannot be undone.`}
          confirmLabel="Delete Task"
          variant="accent"
          onCancel={() => setDeleteTask(null)}
          onConfirm={() => handleDelete(deleteTask.id)}
        />
      )}
      {markCompleteTask && (
        <ConfirmModal
          title="Mark Task as Complete"
          message="Are you sure you want to mark this task as completed?"
          confirmLabel="Mark as Complete"
          variant="accent"
          onCancel={() => setMarkCompleteTask(null)}
          onConfirm={() => handleMarkComplete(markCompleteTask.id)}
        />
      )}
      {markIncompleteTask && (
        <ConfirmModal
          title="Mark Task as Incomplete"
          message="Are you sure you want to mark this task as incomplete?"
          confirmLabel="Mark as Incomplete"
          variant="outline"
          onCancel={() => setMarkIncompleteTask(null)}
          onConfirm={() => handleMarkIncomplete(markIncompleteTask.id)}
        />
      )}
    </div>
  );
}
