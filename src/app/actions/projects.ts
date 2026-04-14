"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedClient } from "@/lib/auth";
import {
  buildNoticePath,
  isBadgeColor,
  isProjectStatus,
  readOptionalText,
  readRedirectPath,
  readRequiredText,
  readUuid,
} from "@/lib/utils";

function validateProjectInput(formData: FormData) {
  const name = readRequiredText(formData, "name", { maxLength: 120 });
  const description = readOptionalText(formData, "description", { maxLength: 500 });
  const badgeColorValue = readRequiredText(formData, "badge_color", { maxLength: 20 });
  const statusValue = readRequiredText(formData, "status", { maxLength: 20 });

  if (!isBadgeColor(badgeColorValue)) {
    throw new Error("Invalid badge color.");
  }

  if (!isProjectStatus(statusValue)) {
    throw new Error("Invalid project status.");
  }

  return {
    name,
    description,
    badge_color: badgeColorValue,
    status: statusValue,
  };
}

function revalidateProjectSurfaces(projectId?: string) {
  revalidatePath("/dashboard");
  revalidatePath("/projects");

  if (projectId) {
    revalidatePath(`/projects/${projectId}`);
  }
}

export async function createProjectAction(formData: FormData) {
  const redirectTo = readRedirectPath(formData, "/projects");

  try {
    const { supabase, user } = await getAuthenticatedClient();
    const payload = validateProjectInput(formData);

    const { error } = await supabase.from("projects").insert({
      ...payload,
      owner_id: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create the project.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateProjectSurfaces();
  redirect(buildNoticePath(redirectTo, "success", "Project created."));
}

export async function updateProjectAction(formData: FormData) {
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, "/projects");

  try {
    const { supabase, user } = await getAuthenticatedClient();
    const payload = validateProjectInput(formData);

    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", projectId)
      .eq("owner_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update the project.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateProjectSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Project updated."));
}

export async function updateProjectStatusAction(formData: FormData) {
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, "/projects");
  const statusValue = readRequiredText(formData, "status", { maxLength: 20 });

  try {
    const { supabase, user } = await getAuthenticatedClient();

    if (!isProjectStatus(statusValue)) {
      throw new Error("Invalid project status.");
    }

    const { error } = await supabase
      .from("projects")
      .update({ status: statusValue })
      .eq("id", projectId)
      .eq("owner_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update project status.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateProjectSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Project status updated."));
}

export async function deleteProjectAction(formData: FormData) {
  const projectId = readUuid(formData, "projectId");
  const redirectTo = readRedirectPath(formData, "/projects");

  try {
    const { supabase, user } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId)
      .eq("owner_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete the project.";
    redirect(buildNoticePath(redirectTo, "error", message));
  }

  revalidateProjectSurfaces(projectId);
  redirect(buildNoticePath(redirectTo, "success", "Project deleted."));
}
