import {
  BADGE_COLOR_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
} from "@/lib/constants";
import type {
  BadgeColor,
  ProjectStatus,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/lib/types";

type Primitive = string | number | boolean | null | undefined;

export function cn(...parts: Primitive[]) {
  return parts.filter(Boolean).join(" ");
}

export function isProjectStatus(value: string): value is ProjectStatus {
  return PROJECT_STATUS_OPTIONS.includes(value as ProjectStatus);
}

export function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUS_OPTIONS.includes(value as TaskStatus);
}

export function isTaskPriority(value: string): value is TaskPriority {
  return TASK_PRIORITY_OPTIONS.includes(value as TaskPriority);
}

export function isBadgeColor(value: string): value is BadgeColor {
  return BADGE_COLOR_OPTIONS.includes(value as BadgeColor);
}

export function readRequiredText(
  formData: FormData,
  key: string,
  options?: { maxLength?: number },
) {
  const rawValue = formData.get(key);
  const value = typeof rawValue === "string" ? rawValue.trim() : "";

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  if (options?.maxLength && value.length > options.maxLength) {
    throw new Error(`${key} is too long.`);
  }

  return value;
}

export function readOptionalText(
  formData: FormData,
  key: string,
  options?: { maxLength?: number },
) {
  const rawValue = formData.get(key);
  const value = typeof rawValue === "string" ? rawValue.trim() : "";

  if (!value) {
    return null;
  }

  if (options?.maxLength && value.length > options.maxLength) {
    throw new Error(`${key} is too long.`);
  }

  return value;
}

export function readRedirectPath(formData: FormData, fallback: string) {
  const rawValue = formData.get("redirectTo");
  const value = typeof rawValue === "string" ? rawValue.trim() : "";

  if (!value.startsWith("/")) {
    return fallback;
  }

  return value;
}

export function readUuid(formData: FormData, key: string) {
  const rawValue = formData.get(key);
  const value = typeof rawValue === "string" ? rawValue.trim() : "";

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
}

export function buildNoticePath(
  path: string,
  noticeType: "success" | "error",
  notice: string,
) {
  const url = new URL(path, "http://localhost");

  url.searchParams.set("noticeType", noticeType);
  url.searchParams.set("notice", notice);

  return `${url.pathname}${url.search}`;
}

export function truncateText(value: string | null, maxLength = 90) {
  if (!value) {
    return null;
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}...`;
}

export function buildProjectDetailPath(projectId: string, searchParams?: URLSearchParams) {
  const query = searchParams?.toString();

  if (!query) {
    return `/projects/${projectId}`;
  }

  return `/projects/${projectId}?${query}`;
}

export function sanitizeFilterParams(searchParams: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams();

  const status = typeof searchParams.status === "string" ? searchParams.status : "";
  const priority =
    typeof searchParams.priority === "string" ? searchParams.priority : "";
  const query = typeof searchParams.q === "string" ? searchParams.q.trim() : "";

  if (status && (status === "all" || isTaskStatus(status))) {
    params.set("status", status);
  }

  if (priority && (priority === "all" || isTaskPriority(priority))) {
    params.set("priority", priority);
  }

  if (query) {
    params.set("q", query);
  }

  return params;
}

export function sortTasks(tasks: Task[]) {
  return [...tasks].sort((left, right) =>
    right.created_at.localeCompare(left.created_at),
  );
}
