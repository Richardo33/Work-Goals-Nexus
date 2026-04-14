import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  PROJECT_BADGE_STYLES,
  PROJECT_STATUS_LABELS,
  STATUS_BADGE_STYLES,
  TASK_STATUS_LABELS,
} from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/data";

export default async function DashboardPage() {
  const [user, dashboard] = await Promise.all([getCurrentUser(), getDashboardData()]);

  return (
    <AppShell currentPath="/dashboard" userEmail={user?.email}>
      <section className="grid gap-4 lg:grid-cols-4">
        <StatCard
          label="Active projects"
          value={dashboard.activeProjectCount}
          helper="Projects currently in motion."
        />
        <StatCard
          label="Total tasks"
          value={dashboard.totalTaskCount}
          helper="Everything across all of your projects."
        />
        <StatCard
          label="Doing"
          value={dashboard.taskStatusCounts.doing}
          helper="Tasks being worked on right now."
        />
        <StatCard
          label="Done"
          value={dashboard.taskStatusCounts.done}
          helper="Completed items already cleared."
        />
      </section>

      <section className="ui-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-stone-950">Tasks by status</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            A quick read on where your workload is stacking up.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(["todo", "doing", "done"] as const).map((status) => (
            <div
              key={status}
              className="rounded-3xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <Badge className={STATUS_BADGE_STYLES[status]}>
                  {TASK_STATUS_LABELS[status]}
                </Badge>
                <span className="text-2xl font-semibold text-stone-950">
                  {dashboard.taskStatusCounts[status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ui-card p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-950">Recent projects</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Jump back into the projects you touched most recently.
            </p>
          </div>
          <Link href="/projects" className="ui-button-secondary">
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {dashboard.recentProjects.length > 0 ? (
            dashboard.recentProjects.map((project) => {
              const palette = PROJECT_BADGE_STYLES[project.badge_color];

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block rounded-[28px] border border-stone-200 bg-gradient-to-br from-white via-white to-stone-50 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-35px_rgba(15,23,42,0.4)]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={palette.badge}>
                      <span className={`mr-2 h-2.5 w-2.5 rounded-full ${palette.dot}`} />
                      {project.name}
                    </Badge>
                    <Badge className={STATUS_BADGE_STYLES[project.status]}>
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {project.description || "No description yet."}
                  </p>
                </Link>
              );
            })
          ) : (
            <EmptyState
              title="No projects yet"
              description="Create your first project to start organizing work requests."
            />
          )}
        </div>
      </section>
    </AppShell>
  );
}
