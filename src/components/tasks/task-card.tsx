import {
  deleteTaskAction,
  updateTaskAction,
  updateTaskStatusAction,
} from "@/app/actions/tasks";
import { TaskDescriptionField } from "@/components/forms/task-description-field";
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
  task: Task;
  projectId: string;
  redirectTo: string;
};

export function TaskCard({ task, projectId, redirectTo }: TaskCardProps) {
  const nextStatuses = TASK_STATUS_OPTIONS.filter((status) => status !== task.status);

  return (
    <article className="ui-card h-[230px] p-5">
      <div className="flex h-full flex-col justify-between gap-4">
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

        <details className="rounded-2xl border border-stone-200 bg-stone-50">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-stone-700">
            Edit task
          </summary>

          <div className="space-y-5 border-t border-stone-200 px-4 py-4">
            <form action={updateTaskAction} className="grid gap-4">
              <input type="hidden" name="taskId" value={task.id} />
              <input type="hidden" name="projectId" value={projectId} />
              <input type="hidden" name="redirectTo" value={redirectTo} />

              <div className="space-y-2">
                <label htmlFor={`edit-task-title-${task.id}`} className="ui-label">
                  Task title
                </label>
                <input
                  id={`edit-task-title-${task.id}`}
                  name="title"
                  required
                  maxLength={160}
                  defaultValue={task.title}
                  className="ui-input"
                />
              </div>

              <TaskDescriptionField
                  id={`edit-task-description-${task.id}`}
                  name="description"
                  defaultValue={task.description ?? ""}
                  placeholder="Optional description"
              />

              <div className="space-y-2">
                <label htmlFor={`edit-task-priority-${task.id}`} className="ui-label">
                  Priority
                </label>
                <select
                  id={`edit-task-priority-${task.id}`}
                  name="priority"
                  defaultValue={task.priority}
                  className="ui-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <input type="hidden" name="status" value={task.status} />

              <SubmitButton className="ui-button-primary" pendingText="Saving...">
                Save task
              </SubmitButton>
            </form>

            <form action={deleteTaskAction}>
              <input type="hidden" name="taskId" value={task.id} />
              <input type="hidden" name="projectId" value={projectId} />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <SubmitButton className="ui-button-danger" pendingText="Deleting...">
                Delete task
              </SubmitButton>
            </form>
          </div>
        </details>
      </div>
    </article>
  );
}
