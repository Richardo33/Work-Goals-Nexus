import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { getCurrentUser } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{
    notice?: string;
    noticeType?: string;
    mode?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [user, resolvedSearchParams] = await Promise.all([
    getCurrentUser(),
    searchParams,
  ]);

  if (user) {
    redirect("/dashboard");
  }

  const mode = resolvedSearchParams.mode === "signup" ? "signup" : "signin";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <section className="ui-card flex min-h-[560px] flex-col justify-between p-8 lg:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-stone-50 px-4 py-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-950 text-xs font-semibold text-white">
                WGN
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-950">Work Goals Nexus</p>
                <p className="text-xs text-stone-500">Project-based task management</p>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                Keep your work clear in one focused workspace.
              </h1>
              <p className="max-w-lg text-base leading-8 text-stone-600">
                Organize projects and tasks with a simple workflow that is ready to use and
                ready to deploy.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-stone-400">Projects</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">Organized</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-stone-400">Tasks</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">Focused</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-stone-400">Workflow</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">Simple</p>
            </div>
          </div>
        </section>

        <section className="flex min-h-[560px] flex-col justify-center gap-4">
          <div className="ui-card border-teal-100 bg-teal-50/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              WGN Access
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
              {mode === "signin" ? "Sign in" : "Register"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Access your workspace and continue your work.
            </p>
          </div>

          <FeedbackBanner
            notice={resolvedSearchParams.notice}
            noticeType={resolvedSearchParams.noticeType}
          />
          <AuthForm mode={mode} />
        </section>
      </div>
    </main>
  );
}
