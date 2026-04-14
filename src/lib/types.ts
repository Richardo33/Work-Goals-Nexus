import type {
  BADGE_COLOR_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
} from "@/lib/constants";

export type ProjectStatus = (typeof PROJECT_STATUS_OPTIONS)[number];
export type TaskStatus = (typeof TASK_STATUS_OPTIONS)[number];
export type TaskPriority = (typeof TASK_PRIORITY_OPTIONS)[number];
export type BadgeColor = (typeof BADGE_COLOR_OPTIONS)[number];

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  badge_color: BadgeColor;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  owner_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  updated_at: string;
}

export interface ProjectListItem extends Project {
  taskCount: number;
  openTaskCount: number;
  doneTaskCount: number;
}

export interface DashboardData {
  activeProjectCount: number;
  totalTaskCount: number;
  taskStatusCounts: Record<TaskStatus, number>;
  recentProjects: Project[];
}

export interface ProjectFilters {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  search: string;
}
