"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import Swal from "sweetalert2";

import { cn } from "@/lib/utils";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  confirmCancelText?: string;
  confirmConfirmText?: string;
  confirmText?: string;
  confirmTitle?: string;
  pendingText?: string;
};

export function SubmitButton({
  children,
  className,
  confirmCancelText = "Cancel",
  confirmConfirmText = "Yes, continue",
  confirmText,
  confirmTitle,
  pendingText = "Saving...",
  onClick,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const skipConfirmationRef = useRef(false);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented || pending || !confirmTitle || skipConfirmationRef.current) {
      return;
    }

    event.preventDefault();

    const result = await Swal.fire({
      title: confirmTitle,
      text: confirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmConfirmText,
      cancelButtonText: confirmCancelText,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#57534e",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    skipConfirmationRef.current = true;
    form.requestSubmit(event.currentTarget);
    skipConfirmationRef.current = false;
  }

  return (
    <button
      {...props}
      type={props.type ?? "submit"}
      className={cn(className)}
      disabled={pending || props.disabled}
      onClick={handleClick}
    >
      {pending ? pendingText : children}
    </button>
  );
}
