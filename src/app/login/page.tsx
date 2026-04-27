import Image from "next/image";
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

const features = [
  {
    label: "Projects",
    value: "Organized",
    color: "text-sky-500",
    bg: "bg-sky-50",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.75 7.75A2.75 2.75 0 0 1 6.5 5h3.25l1.8 2h5.95A2.5 2.5 0 0 1 20 9.5v7.75A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V8.5a.75.75 0 0 1 .75-.75Z" />
      </svg>
    ),
  },
  {
    label: "Tasks",
    value: "Focused",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="m8.8 12 2.2 2.2 4.4-4.4" />
      </svg>
    ),
  },
  {
    label: "Workflow",
    value: "Simple",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="6" height="6" rx="1.25" />
        <rect x="14" y="4" width="6" height="6" rx="1.25" />
        <rect x="9" y="14" width="6" height="6" rx="1.25" />
        <path d="M12 10v4" />
        <path d="M10 7h4" />
        <path d="M7 10v2h10v-2" />
      </svg>
    ),
  },
];

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [user, resolvedSearchParams] = await Promise.all([
    getCurrentUser(),
    searchParams,
  ]);

  if (user) {
    redirect("/dashboard");
  }

  const mode = resolvedSearchParams.mode === "signup" ? "signup" : "signin";

  const title = mode === "signin" ? "Sign in" : "Register";

  const subtitle =
    mode === "signin"
      ? "Access your workspace and continue your work."
      : "Create your workspace and start organizing your goals.";

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.17),transparent_30%),#f6f3ec] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-7xl items-center justify-center">
        <div className="grid w-full items-stretch gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          {/* LEFT CARD */}
          <section className="ui-card flex h-full min-h-160 max-h-190 flex-col justify-between overflow-hidden bg-[#fdfdfd] px-8 py-8 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.35)] sm:px-10 sm:py-9 lg:px-12 lg:py-10">
            <div>
              <div className="mb-10 flex items-center">
                <Image
                  src="/logo.png"
                  alt="Work Goals Nexus"
                  width={190}
                  height={64}
                  priority
                  className="h-auto w-37.5 object-contain object-left sm:w-41.25"
                />
              </div>

              <div className="max-w-140">
                <h1 className="text-[3.05rem] font-semibold leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-[3.65rem] lg:text-[4rem]">
                  Keep your work clear in one focused workspace
                  <span className="text-sky-500">.</span>
                </h1>

                <div className="mt-7 h-1 w-16 rounded-full bg-linear-to-r from-sky-500 to-cyan-400" />

                <p className="mt-7 max-w-140 text-[16px] leading-8 text-stone-600">
                  Organize projects and tasks with a simple workflow that is
                  ready to use and ready to deploy.
                </p>
              </div>
            </div>

            <div className="mt-8 grid shrink-0 gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_16px_45px_-36px_rgba(15,23,42,0.35)]"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${feature.bg} ${feature.color}`}
                  >
                    {feature.icon}
                  </div>

                  <p
                    className={`mt-5 text-[11px] font-bold uppercase tracking-[0.28em] ${feature.color}`}
                  >
                    {feature.label}
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-slate-950">
                    {feature.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT CARD */}
          <section className="ui-card flex h-full min-h-160 max-h-190 flex-col justify-center overflow-hidden bg-white px-8 py-8 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.35)] sm:px-10 sm:py-9 lg:px-12 lg:py-10">
            <div className="w-full">
              <div className="mb-6 rounded-[28px] border border-teal-100 bg-teal-50/70 p-6">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-950">
                  {title}
                </h2>

                <p className="mt-3 text-base leading-7 text-stone-600">
                  {subtitle}
                </p>
              </div>

              <div className="rounded-[28px] bg-white">
                <FeedbackBanner
                  notice={resolvedSearchParams.notice}
                  noticeType={resolvedSearchParams.noticeType}
                />

                <AuthForm mode={mode} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
