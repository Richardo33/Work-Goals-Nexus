"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

type FeedbackBannerProps = {
  notice?: string;
  noticeType?: string;
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
}: FeedbackBannerProps) {
  if (!notice) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <FeedbackAlert notice={notice} noticeType={noticeType} />
    </Suspense>
  );
}
