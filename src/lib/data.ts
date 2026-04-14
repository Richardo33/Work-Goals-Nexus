import { notFound } from "next/navigation";

import { getAuthenticatedClient } from "@/lib/auth";
import type {
  DashboardData,
  Project,
  ProjectFilters,
  ProjectListItem,
  Task,
} from "@/lib/types";

export async function getDashboardData(): Promise<DashboardData> {
  const { supabase, user } = await getAuthenticatedClient();

  const [projectsResult, tasksResult] = await Promise.all([
    supabase
      .from("projects")
      .select(
        "id, owner_id, name, description, badge_color, status, created_at, updated_at",
      )
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false }),
    supabase.from("tasks").select("id, status").eq("owner_id", user.id),
  ]);

  if (projectsResult.error) {
    throw new Error(projectsResult.error.message);
  }

  if (tasksResult.error) {
    throw new Error(tasksResult.error.message);
  }

  const projects = (projectsResult.data ?? []) as Project[];
  const tasks = (tasksResult.data ?? []) as Pick<Task, "id" | "status">[];

  return {
    activeProjectCount: projects.filter((project) => project.status === "active").length,
    totalTaskCount: tasks.length,
    taskStatusCounts: {
      todo: tasks.filter((task) => task.status === "todo").length,
      doing: tasks.filter((task) => task.status === "doing").length,
      done: tasks.filter((task) => task.status === "done").length,
    },
    recentProjects: projects.slice(0, 4),
  };
}

export async function getProjectsPageData(): Promise<ProjectListItem[]> {
  const { supabase, user } = await getAuthenticatedClient();

  const [projectsResult, tasksResult] = await Promise.all([
    supabase
      .from("projects")
      .select(
        "id, owner_id, name, description, badge_color, status, created_at, updated_at",
      )
      .eq("owner_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase.from("tasks").select("project_id, status").eq("owner_id", user.id),
  ]);

  if (projectsResult.error) {
    throw new Error(projectsResult.error.message);
  }

  if (tasksResult.error) {
    throw new Error(tasksResult.error.message);
  }

  const counts = new Map<string, { total: number; done: number }>();

  for (const task of (tasksResult.data ?? []) as Pick<Task, "project_id" | "status">[]) {
    const current = counts.get(task.project_id) ?? { total: 0, done: 0 };
    current.total += 1;

    if (task.status === "done") {
      current.done += 1;
    }

    counts.set(task.project_id, current);
  }

  return ((projectsResult.data ?? []) as Project[]).map((project) => {
    const projectCounts = counts.get(project.id) ?? { total: 0, done: 0 };

    return {
      ...project,
      taskCount: projectCounts.total,
      doneTaskCount: projectCounts.done,
      openTaskCount: projectCounts.total - projectCounts.done,
    };
  });
}

export async function getProjectDetailData(
  projectId: string,
  filters: ProjectFilters,
) {
  const { supabase, user } = await getAuthenticatedClient();

  const projectResult = await supabase
    .from("projects")
    .select(
      "id, owner_id, name, description, badge_color, status, created_at, updated_at",
    )
    .eq("id", projectId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (projectResult.error) {
    throw new Error(projectResult.error.message);
  }

  if (!projectResult.data) {
    notFound();
  }

  let tasksQuery = supabase
    .from("tasks")
    .select(
      "id, project_id, owner_id, title, description, status, priority, created_at, updated_at",
    )
    .eq("project_id", projectId)
    .eq("owner_id", user.id);

  if (filters.status !== "all") {
    tasksQuery = tasksQuery.eq("status", filters.status);
  }

  if (filters.priority !== "all") {
    tasksQuery = tasksQuery.eq("priority", filters.priority);
  }

  if (filters.search) {
    tasksQuery = tasksQuery.ilike("title", `%${filters.search}%`);
  }

  const tasksResult = await tasksQuery.order("created_at", { ascending: false });

  if (tasksResult.error) {
    throw new Error(tasksResult.error.message);
  }

  return {
    project: projectResult.data as Project,
    tasks: (tasksResult.data ?? []) as Task[],
  };
}
