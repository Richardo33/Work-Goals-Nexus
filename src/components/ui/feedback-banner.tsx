"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

import { cn } from "@/lib/utils";

type FeedbackBannerProps = {
  notice?: string;
  noticeType?: string;
  variant?: "banner" | "swal";
};

function FeedbackAlert({
  notice,
  noticeType = "success",
}: Pick<FeedbackBannerProps, "notice" | "noticeType">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shownKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const shownKey = `${noticeType}:${notice}`;

    if (shownKeyRef.current === shownKey) {
      return;
    }

    shownKeyRef.current = shownKey;

    const params = new URLSearchParams(searchParams.toString());
    params.delete("notice");
    params.delete("noticeType");

    const nextQuery = params.toString();
    const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    void Swal.fire({
      title: noticeType === "error" ? "Action failed" : "Success",
      text: notice,
      icon: noticeType === "error" ? "error" : "success",
      confirmButtonColor: noticeType === "error" ? "#e11d48" : "#0f766e",
    }).finally(() => {
      router.replace(nextPath, { scroll: false });
    });
  }, [notice, noticeType, pathname, router, searchParams]);

  return null;
}

export function FeedbackBanner({
  notice,
  noticeType = "success",
  variant = "banner",
}: FeedbackBannerProps) {
  if (!notice) {
    return null;
  }

  if (variant === "swal") {
    return (
      <Suspense fallback={null}>
        <FeedbackAlert notice={notice} noticeType={noticeType} />
      </Suspense>
    );
  }

  const isError = noticeType === "error";

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm shadow-sm",
        isError
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      )}
    >
      {notice}
    </div>
  );
}
