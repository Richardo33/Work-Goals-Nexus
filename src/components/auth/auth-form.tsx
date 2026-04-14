import Link from "next/link";

import { signInAction, signUpAction } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignIn = mode === "signin";
  const action = isSignIn ? signInAction : signUpAction;
  const title = isSignIn ? "Sign in" : "Sign up";
  const description = isSignIn
    ? "Masuk untuk lanjut mengelola project dan task."
    : "Buat akun baru untuk mulai memakai WGN.";
  const submitLabel = isSignIn ? "Sign in" : "Sign up";
  const pendingLabel = isSignIn ? "Signing in..." : "Creating...";
  const passwordAutoComplete = isSignIn ? "current-password" : "new-password";
  const switchHref = isSignIn ? "/login?mode=signup" : "/login?mode=signin";
  const switchLabel = isSignIn ? "Belum punya akun? Sign up" : "Sudah punya akun? Sign in";

  return (
    <section className="ui-card p-6">
      <div className="mb-5 space-y-1">
        <h2 className="text-2xl font-semibold text-stone-950">{title}</h2>
        <p className="text-sm leading-6 text-stone-600">{description}</p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor={`${mode}-email`} className="ui-label">
            Email
          </label>
          <input
            id={`${mode}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="ui-input"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`${mode}-password`} className="ui-label">
            Password
          </label>
          <input
            id={`${mode}-password`}
            name="password"
            type="password"
            autoComplete={passwordAutoComplete}
            minLength={isSignIn ? undefined : 6}
            required
            className="ui-input"
            placeholder={isSignIn ? "Enter your password" : "At least 6 characters"}
          />
        </div>

        <SubmitButton className="ui-button-primary w-full" pendingText={pendingLabel}>
          {submitLabel}
        </SubmitButton>
      </form>

      <div className="mt-5 border-t border-stone-200 pt-4">
        <Link
          href={switchHref}
          className="text-sm font-medium text-teal-700 transition hover:text-teal-800"
        >
          {switchLabel}
        </Link>
      </div>
    </section>
  );
}
