import { updateProjectStatusAction } from "@/app/actions/projects";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_OPTIONS } from "@/lib/constants";
import type { ProjectStatus } from "@/lib/types";
import { SubmitButton } from "@/components/ui/submit-button";

type ProjectStatusMenuProps = {
  projectId: string;
  currentStatus: ProjectStatus;
  redirectTo: string;
  compact?: boolean;
};

export function ProjectStatusMenu({
  projectId,
  currentStatus,
  redirectTo,
  compact = false,
}: ProjectStatusMenuProps) {
  const nextStatuses = PROJECT_STATUS_OPTIONS.filter((status) => status !== currentStatus);

  return (
    <details className="relative">
      <summary
        className={
          compact
            ? "flex h-10 cursor-pointer list-none items-center justify-center rounded-2xl border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            : "flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
        }
      >
        {compact ? "Change status" : "..."}
      </summary>

      <div className="absolute right-0 top-12 z-10 w-56 rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_40px_-25px_rgba(15,23,42,0.35)]">
        <div className="space-y-1">
          {nextStatuses.map((status) => (
            <form key={status} action={updateProjectStatusAction}>
              <input type="hidden" name="projectId" value={projectId} />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <input type="hidden" name="status" value={status} />
              <SubmitButton
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                pendingText="Updating..."
              >
                Move to {PROJECT_STATUS_LABELS[status]}
              </SubmitButton>
            </form>
          ))}
        </div>
      </div>
    </details>
  );
}
