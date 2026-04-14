"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedClient } from "@/lib/auth";
import {
  buildNoticePath,
  isTaskPriority,
  isTaskStatus,
  readOptionalText,
  readRedirectPath,
  readRequiredText,
  readUuid,
} from "@/lib/utils";

function revalidateTaskSurfaces(projectId: string) {
  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
}

function validateTaskInput(formData: FormData) {
  const title = readRequiredText(formData, "title", { maxLength: 160 });
  const description = readOptionalText(formData, "description", { maxLength: 1000 });
  const priorityValue = readRequiredText(formData, "priority", { maxLength: 20 });
  const statusValue = readRequiredText(formData, "status", { maxLength: 20 });

  if (!isTaskStatus(statusValue)) {
    throw new Error("Invalid task status.");
  }

  if (!isTaskPriority(priorityValue)) {
    throw new Error("Invalid task priority.");
  }

  return {
    title,
    description,
    status: statusValue,
    priority: priorityValue,
  };
}

export async function createTaskAction(formData: FormData) {
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, `/projects/${projectId}`);

  try {
    const { supabase, user } = await getAuthenticatedClient();
    const title = readRequiredText(formData, "title", { maxLength: 160 });
    const description = readOptionalText(formData, "description", { maxLength: 1000 });
    const priorityValue = readRequiredText(formData, "priority", { maxLength: 20 });

    if (!isTaskPriority(priorityValue)) {
      throw new Error("Invalid task priority.");
    }

    const { error } = await supabase.from("tasks").insert({
      title,
      description,
      priority: priorityValue,
      status: "todo",
      project_id: projectId,
      owner_id: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create task.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateTaskSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Task created."));
}

export async function updateTaskAction(formData: FormData) {
  const taskId = readUuid(formData, "taskId");
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, `/projects/${projectId}`);

  try {
    const { supabase, user } = await getAuthenticatedClient();
    const payload = validateTaskInput(formData);

    const { error } = await supabase
      .from("tasks")
      .update(payload)
      .eq("id", taskId)
      .eq("owner_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update task.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateTaskSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Task updated."));
}

export async function updateTaskStatusAction(formData: FormData) {
  const taskId = readUuid(formData, "taskId");
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, `/projects/${projectId}`);
  const statusValue = readRequiredText(formData, "status", { maxLength: 20 });

  try {
    const { supabase, user } = await getAuthenticatedClient();

    if (!isTaskStatus(statusValue)) {
      throw new Error("Invalid task status.");
    }

    const { error } = await supabase
      .from("tasks")
      .update({ status: statusValue })
      .eq("id", taskId)
      .eq("owner_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update task status.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateTaskSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Task status updated."));
}

export async function deleteTaskAction(formData: FormData) {
  const taskId = readUuid(formData, "taskId");
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, `/projects/${projectId}`);

  try {
    const { supabase, user } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("owner_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete task.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateTaskSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Task deleted."));
}
