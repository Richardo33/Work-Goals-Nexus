"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  className,
  pendingText = "Saving...",
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type={props.type ?? "submit"}
      className={cn(className)}
      disabled={pending || props.disabled}
    >
      {pending ? pendingText : children}
    </button>
  );
}
