import { createTaskAction, updateTaskAction } from "@/app/actions/tasks";
import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_OPTIONS,
} from "@/lib/constants";
import { TaskDescriptionField } from "@/components/forms/task-description-field";
import type { Task } from "@/lib/types";
import { SubmitButton } from "@/components/ui/submit-button";

type TaskFormProps = {
  mode: "create" | "edit";
  projectId: string;
  redirectTo: string;
  task?: Task;
};

export function TaskForm({ mode, projectId, redirectTo, task }: TaskFormProps) {
  const action = mode === "create" ? createTaskAction : updateTaskAction;

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      {task ? <input type="hidden" name="taskId" value={task.id} /> : null}

      <div className="space-y-2">
        <label htmlFor={`${mode}-task-title-${task?.id ?? "new"}`} className="ui-label">
          Task title
        </label>
        <input
          id={`${mode}-task-title-${task?.id ?? "new"}`}
          name="title"
          required
          maxLength={160}
          defaultValue={task?.title}
          className="ui-input"
          placeholder="Prepare launch checklist"
        />
      </div>

      <TaskDescriptionField
          id={`${mode}-task-description-${task?.id ?? "new"}`}
          name="description"
          defaultValue={task?.description ?? ""}
          placeholder="Optional context or next steps"
      />

      <div className="space-y-2">
          <label
            htmlFor={`${mode}-task-priority-${task?.id ?? "new"}`}
            className="ui-label"
          >
            Priority
          </label>
          <select
            id={`${mode}-task-priority-${task?.id ?? "new"}`}
            name="priority"
            defaultValue={task?.priority ?? "medium"}
            className="ui-select"
          >
            {TASK_PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {TASK_PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
      </div>

      {task ? <input type="hidden" name="status" value={task.status} /> : null}

      <SubmitButton
        className="ui-button-primary"
        pendingText={mode === "create" ? "Creating..." : "Saving..."}
      >
        {mode === "create" ? "Create task" : "Save task"}
      </SubmitButton>
    </form>
  );
}
