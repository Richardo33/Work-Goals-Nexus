import { cn } from "@/lib/utils";

type FeedbackBannerProps = {
  notice?: string;
  noticeType?: string;
};

export function FeedbackBanner({
  notice,
  noticeType = "success",
}: FeedbackBannerProps) {
  if (!notice) {
    return null;
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
