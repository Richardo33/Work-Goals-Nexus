import Link from "next/link";

import { signOutAction } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
  currentPath: string;
  userEmail?: string | null;
};

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
];

export function AppShell({ children, currentPath, userEmail }: AppShellProps) {
  const displayName = userEmail?.split("@")[0] || "Your account";

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[32px] border border-white/60 bg-white/80 px-6 py-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Link href="/dashboard" className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-sm font-bold text-white">
                  WGN
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Work Goals Nexus
                  </p>
                  <p className="text-sm text-stone-600">Focused task management by project.</p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <nav className="flex flex-wrap items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-1.5">
                {navigation.map((item) => {
                  const isActive =
                    currentPath === item.href || currentPath.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-4 py-2 text-sm font-medium transition",
                        isActive
                          ? "bg-white text-stone-950 shadow-sm"
                          : "text-stone-600 hover:text-stone-950",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
                    Signed in
                  </p>
                  <p className="text-sm font-medium text-stone-700">{displayName}</p>
                </div>
                <form action={signOutAction}>
                  <SubmitButton className="ui-button-secondary" pendingText="Signing out...">
                    Sign out
                  </SubmitButton>
                </form>
              </div>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
