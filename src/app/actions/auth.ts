"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { buildNoticePath, readRequiredText } from "@/lib/utils";

export async function signInAction(formData: FormData) {
  const email = readRequiredText(formData, "email", { maxLength: 320 });
  const password = readRequiredText(formData, "password", { maxLength: 128 });
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(buildNoticePath("/login", "error", error.message));
  }

  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const email = readRequiredText(formData, "email", { maxLength: 320 });
  const password = readRequiredText(formData, "password", { maxLength: 128 });
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(buildNoticePath("/login", "error", error.message));
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect(
    buildNoticePath(
      "/login",
      "success",
      "Account created. Check your email if confirmations are enabled, then sign in.",
    ),
  );
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}
