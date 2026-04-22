import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { AddTaskModal } from "@/components/tasks/add-task-modal";
import { ProjectStatusMenu } from "@/components/projects/project-status-menu";
import { KanbanColumn } from "@/components/tasks/kanban-column";
import { Badge } from "@/components/ui/badge";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { PageHeader } from "@/components/ui/page-header";
import {
  PROJECT_BADGE_STYLES,
  PROJECT_STATUS_LABELS,
  STATUS_BADGE_STYLES,
} from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth";
import { getProjectDetailData } from "@/lib/data";
import { type ProjectFilters } from "@/lib/types";
import { buildProjectDetailPath, sanitizeFilterParams, sortTasks } from "@/lib/utils";

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    status?: string;
    priority?: string;
    q?: string;
    notice?: string;
    noticeType?: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: ProjectDetailPageProps) {
  const [{ id }, resolvedSearchParams, user] = await Promise.all([
    params,
    searchParams,
    getCurrentUser(),
  ]);

  const filters: ProjectFilters = {
    status:
      resolvedSearchParams.status === "todo" ||
      resolvedSearchParams.status === "doing" ||
      resolvedSearchParams.status === "done"
        ? resolvedSearchParams.status
        : "all",
    priority:
      resolvedSearchParams.priority === "low" ||
      resolvedSearchParams.priority === "medium" ||
      resolvedSearchParams.priority === "high"
        ? resolvedSearchParams.priority
        : "all",
    search: resolvedSearchParams.q?.trim() ?? "",
  };

  const { project, tasks } = await getProjectDetailData(id, filters);
  const filterParams = sanitizeFilterParams(resolvedSearchParams);
  const redirectTo = buildProjectDetailPath(project.id, filterParams);
  const palette = PROJECT_BADGE_STYLES[project.badge_color];
  const sortedTasks = sortTasks(tasks);

  const todoTasks = sortedTasks.filter((task) => task.status === "todo");
  const doingTasks = sortedTasks.filter((task) => task.status === "doing");
  const doneTasks = sortedTasks.filter((task) => task.status === "done");

  return (
    <AppShell currentPath={`/projects/${project.id}`} userEmail={user?.email}>
      <PageHeader
        eyebrow="Project board"
        title={project.name}
        description={
          project.description ||
          "Manage everything related to this project in a simple kanban-style workflow."
        }
        action={
          <div className="flex flex-wrap gap-3">
            <AddTaskModal projectId={project.id} redirectTo={redirectTo} />
            <Link href="/projects" className="ui-button-secondary">
              Back to projects
            </Link>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge className={palette.badge}>
          <span className={`mr-2 h-2.5 w-2.5 rounded-full ${palette.dot}`} />
          {project.name}
        </Badge>
        <Badge className={STATUS_BADGE_STYLES[project.status]}>
          {PROJECT_STATUS_LABELS[project.status]}
        </Badge>
        <ProjectStatusMenu
          projectId={project.id}
          currentStatus={project.status}
          redirectTo={redirectTo}
          compact
        />
      </div>

      <FeedbackBanner
        notice={resolvedSearchParams.notice}
        noticeType={resolvedSearchParams.noticeType}
        variant="swal"
      />

      <section className="ui-card p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-stone-950">Filter tasks</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Search inside this project only, then inspect each status column with less noise.
          </p>
        </div>

        <form className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
          <div className="space-y-2">
            <label htmlFor="task-search" className="ui-label">
              Search by title
            </label>
            <input
              id="task-search"
              name="q"
              defaultValue={filters.search}
              className="ui-input"
              placeholder="Search tasks"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status-filter" className="ui-label">
              Status
            </label>
            <select
              id="status-filter"
              name="status"
              defaultValue={filters.status}
              className="ui-select"
            >
              <option value="all">All statuses</option>
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority-filter" className="ui-label">
              Priority
            </label>
            <select
              id="priority-filter"
              name="priority"
              defaultValue={filters.priority}
              className="ui-select"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button className="ui-button-primary" type="submit">
              Apply
            </button>
            <Link href={`/projects/${project.id}`} className="ui-button-secondary">
              Reset
            </Link>
          </div>
        </form>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <KanbanColumn
          status="todo"
          tasks={todoTasks}
          projectId={project.id}
          redirectTo={redirectTo}
        />
        <KanbanColumn
          status="doing"
          tasks={doingTasks}
          projectId={project.id}
          redirectTo={redirectTo}
        />
        <KanbanColumn
          status="done"
          tasks={doneTasks}
          projectId={project.id}
          redirectTo={redirectTo}
        />
      </section>
    </AppShell>
  );
}
