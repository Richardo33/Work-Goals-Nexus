import Link from "next/link";

import { deleteProjectAction } from "@/app/actions/projects";
import { ProjectForm } from "@/components/forms/project-form";
import { ProjectStatusMenu } from "@/components/projects/project-status-menu";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  PROJECT_BADGE_STYLES,
  PROJECT_STATUS_LABELS,
  STATUS_BADGE_STYLES,
} from "@/lib/constants";
import type { ProjectListItem } from "@/lib/types";

type ProjectCardProps = {
  project: ProjectListItem;
  redirectTo: string;
};

export function ProjectCard({ project, redirectTo }: ProjectCardProps) {
  const palette = PROJECT_BADGE_STYLES[project.badge_color];

  return (
    <article
      className={`ui-card overflow-hidden bg-gradient-to-br ${palette.accent} p-6`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={palette.badge}>
                <span className={`mr-2 h-2.5 w-2.5 rounded-full ${palette.dot}`} />
                {project.name}
              </Badge>
              <Badge className={STATUS_BADGE_STYLES[project.status]}>
                {PROJECT_STATUS_LABELS[project.status]}
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-stone-950">{project.name}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                {project.description ||
                  "No description yet. Add one to capture the goal or context."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ProjectStatusMenu
              projectId={project.id}
              currentStatus={project.status}
              redirectTo={redirectTo}
            />
            <Link href={`/projects/${project.id}`} className="ui-button-secondary text-center">
              Open board
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Tasks</p>
            <p className="mt-2 text-2xl font-semibold text-stone-950">{project.taskCount}</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
              Still open
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-950">
              {project.openTaskCount}
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Done</p>
            <p className="mt-2 text-2xl font-semibold text-stone-950">
              {project.doneTaskCount}
            </p>
          </div>
        </div>

        <details className="rounded-2xl border border-stone-200 bg-white/85">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-stone-700">
            Edit project
          </summary>
          <div className="border-t border-stone-200 px-4 py-4">
            <ProjectForm mode="edit" project={project} redirectTo={redirectTo} />
          </div>
        </details>

        <form action={deleteProjectAction} className="self-start">
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="redirectTo" value="/projects" />
          <SubmitButton
            className="ui-button-danger"
            pendingText="Deleting..."
            confirmTitle="Delete this project?"
            confirmText="This will permanently remove the project and all tasks inside it."
            confirmConfirmText="Yes, delete it"
          >
            Delete project
          </SubmitButton>
        </form>
      </div>
    </article>
  );
}
