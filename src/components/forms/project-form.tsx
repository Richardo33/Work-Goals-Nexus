import { createProjectAction, updateProjectAction } from "@/app/actions/projects";
import {
  BADGE_COLOR_OPTIONS,
  BADGE_COLOR_LABELS,
  PROJECT_BADGE_STYLES,
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_OPTIONS,
} from "@/lib/constants";
import type { Project } from "@/lib/types";
import { SubmitButton } from "@/components/ui/submit-button";
import { cn } from "@/lib/utils";

type ProjectFormProps = {
  mode: "create" | "edit";
  redirectTo: string;
  project?: Project;
};

export function ProjectForm({ mode, redirectTo, project }: ProjectFormProps) {
  const action = mode === "create" ? createProjectAction : updateProjectAction;

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      {project ? <input type="hidden" name="projectId" value={project.id} /> : null}
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div className="space-y-2 md:col-span-2">
        <label htmlFor={`${mode}-project-name`} className="ui-label">
          Project name
        </label>
        <input
          id={`${mode}-project-name`}
          name="name"
          required
          maxLength={120}
          defaultValue={project?.name}
          className="ui-input"
          placeholder="Website redesign"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <label htmlFor={`${mode}-project-description`} className="ui-label">
          Description
        </label>
        <textarea
          id={`${mode}-project-description`}
          name="description"
          rows={3}
          maxLength={500}
          defaultValue={project?.description ?? ""}
          className="ui-textarea"
          placeholder="Optional notes about scope, stakeholders, or goals"
        />
      </div>

      <div className="space-y-2">
        <span className="ui-label">
          Badge color
        </span>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
          {BADGE_COLOR_OPTIONS.map((color) => (
            <label key={color} className="cursor-pointer">
              <input
                type="radio"
                name="badge_color"
                value={color}
                defaultChecked={(project?.badge_color ?? "blue") === color}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white px-3 py-3 text-xs font-medium text-stone-600 transition",
                  "peer-checked:border-stone-950 peer-checked:bg-stone-50 peer-checked:text-stone-950",
                )}
              >
                <span
                  className={cn(
                    "h-5 w-5 rounded-full ring-4 ring-white",
                    PROJECT_BADGE_STYLES[color].selector,
                  )}
                />
                <span>{BADGE_COLOR_LABELS[color]}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${mode}-project-status`} className="ui-label">
          Status
        </label>
        <select
          id={`${mode}-project-status`}
          name="status"
          defaultValue={project?.status ?? "active"}
          className="ui-select"
        >
          {PROJECT_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {PROJECT_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <SubmitButton
          className="ui-button-primary"
          pendingText={mode === "create" ? "Creating..." : "Updating..."}
        >
          {mode === "create" ? "Create project" : "Save changes"}
        </SubmitButton>
      </div>
    </form>
  );
}
