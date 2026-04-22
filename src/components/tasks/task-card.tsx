"use client";

import {
  deleteTaskAction,
  updateTaskStatusAction,
} from "@/app/actions/tasks";
import { TaskDescriptionPreview } from "@/components/tasks/task-description-preview";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  STATUS_BADGE_STYLES,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  TASK_STATUS_OPTIONS,
} from "@/lib/constants";
import type { Task } from "@/lib/types";

type TaskCardProps = {
  onEditTask: (taskId: string) => void;
  task: Task;
  projectId: string;
  redirectTo: string;
};

export function TaskCard({ task, projectId, redirectTo, onEditTask }: TaskCardProps) {
  const nextStatuses = TASK_STATUS_OPTIONS.filter((status) => status !== task.status);

  return (
    <article className="ui-card min-h-[230px] p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={STATUS_BADGE_STYLES[task.priority]}>
                {TASK_PRIORITY_LABELS[task.priority]}
              </Badge>
              <Badge className={STATUS_BADGE_STYLES[task.status]}>
                {TASK_STATUS_LABELS[task.status]}
              </Badge>
            </div>

            <div className="min-w-0">
              <div className="min-h-7">
                <h3 className="task-title-clamp text-lg font-semibold text-stone-950">
                  {task.title}
                </h3>
              </div>
              <div className="mt-2 min-h-12">
                <TaskDescriptionPreview value={task.description} />
              </div>
            </div>
          </div>

          <details className="relative">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-600 transition hover:bg-stone-100">
              ...
            </summary>

            <div className="absolute right-0 top-12 z-10 w-52 rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_40px_-25px_rgba(15,23,42,0.35)]">
              <div className="space-y-1">
                {nextStatuses.map((status) => (
                  <form key={status} action={updateTaskStatusAction}>
                    <input type="hidden" name="taskId" value={task.id} />
                    <input type="hidden" name="projectId" value={projectId} />
                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <input type="hidden" name="status" value={status} />
                    <SubmitButton
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                      pendingText="Moving..."
                    >
                      Move to {TASK_STATUS_LABELS[status]}
                    </SubmitButton>
                  </form>
                ))}
              </div>
            </div>
          </details>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEditTask(task.id)}
            className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Edit task
          </button>

          <form action={deleteTaskAction}>
            <input type="hidden" name="taskId" value={task.id} />
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <SubmitButton
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 transition hover:bg-rose-100"
              pendingText="..."
              confirmTitle="Delete this task?"
              confirmText="This task will be permanently removed from the board."
              confirmConfirmText="Yes, delete it"
              aria-label="Delete task"
              title="Delete task"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4.75A1.75 1.75 0 0 1 9.75 3h4.5A1.75 1.75 0 0 1 16 4.75V6" />
                <path d="M6.75 6l.7 11.1A2 2 0 0 0 9.44 19h5.12a2 2 0 0 0 1.99-1.9L17.25 6" />
                <path d="M10 10.25v5.5" />
                <path d="M14 10.25v5.5" />
              </svg>
            </SubmitButton>
          </form>
        </div>
      </div>
    </article>
  );
}
