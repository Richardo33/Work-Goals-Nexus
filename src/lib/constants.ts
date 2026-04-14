export const PROJECT_STATUS_OPTIONS = ["active", "completed", "archived"] as const;
export const TASK_STATUS_OPTIONS = ["todo", "doing", "done"] as const;
export const TASK_PRIORITY_OPTIONS = ["low", "medium", "high"] as const;
export const BADGE_COLOR_OPTIONS = [
  "slate",
  "stone",
  "rose",
  "orange",
  "amber",
  "lime",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "pink",
] as const;

export const PROJECT_STATUS_LABELS = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
} as const;

export const TASK_STATUS_LABELS = {
  todo: "To Do",
  doing: "Doing",
  done: "Done",
} as const;

export const TASK_PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;

export const BADGE_COLOR_LABELS = {
  slate: "Slate",
  stone: "Stone",
  rose: "Rose",
  orange: "Orange",
  amber: "Amber",
  lime: "Lime",
  emerald: "Emerald",
  teal: "Teal",
  cyan: "Cyan",
  sky: "Sky",
  blue: "Blue",
  indigo: "Indigo",
  violet: "Violet",
  pink: "Pink",
} as const;

export const PROJECT_BADGE_STYLES = {
  slate: {
    dot: "bg-slate-500",
    badge: "border-slate-200 bg-slate-100 text-slate-700",
    accent: "from-slate-500/20 via-slate-200/40 to-white",
    selector: "bg-slate-500",
  },
  stone: {
    dot: "bg-stone-500",
    badge: "border-stone-200 bg-stone-100 text-stone-700",
    accent: "from-stone-500/20 via-stone-200/40 to-white",
    selector: "bg-stone-500",
  },
  rose: {
    dot: "bg-rose-500",
    badge: "border-rose-200 bg-rose-100 text-rose-700",
    accent: "from-rose-500/20 via-rose-200/40 to-white",
    selector: "bg-rose-500",
  },
  orange: {
    dot: "bg-orange-500",
    badge: "border-orange-200 bg-orange-100 text-orange-700",
    accent: "from-orange-500/20 via-orange-200/40 to-white",
    selector: "bg-orange-500",
  },
  amber: {
    dot: "bg-amber-500",
    badge: "border-amber-200 bg-amber-100 text-amber-700",
    accent: "from-amber-500/20 via-amber-200/40 to-white",
    selector: "bg-amber-500",
  },
  lime: {
    dot: "bg-lime-500",
    badge: "border-lime-200 bg-lime-100 text-lime-700",
    accent: "from-lime-500/20 via-lime-200/40 to-white",
    selector: "bg-lime-500",
  },
  blue: {
    dot: "bg-sky-500",
    badge: "border-sky-200 bg-sky-100 text-sky-700",
    accent: "from-sky-500/20 via-sky-200/40 to-white",
    selector: "bg-sky-500",
  },
  emerald: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-100 text-emerald-700",
    accent: "from-emerald-500/20 via-emerald-200/40 to-white",
    selector: "bg-emerald-500",
  },
  teal: {
    dot: "bg-teal-500",
    badge: "border-teal-200 bg-teal-100 text-teal-700",
    accent: "from-teal-500/20 via-teal-200/40 to-white",
    selector: "bg-teal-500",
  },
  cyan: {
    dot: "bg-cyan-500",
    badge: "border-cyan-200 bg-cyan-100 text-cyan-700",
    accent: "from-cyan-500/20 via-cyan-200/40 to-white",
    selector: "bg-cyan-500",
  },
  sky: {
    dot: "bg-sky-500",
    badge: "border-sky-200 bg-sky-100 text-sky-700",
    accent: "from-sky-500/20 via-sky-200/40 to-white",
    selector: "bg-sky-500",
  },
  indigo: {
    dot: "bg-indigo-500",
    badge: "border-indigo-200 bg-indigo-100 text-indigo-700",
    accent: "from-indigo-500/20 via-indigo-200/40 to-white",
    selector: "bg-indigo-500",
  },
  violet: {
    dot: "bg-violet-500",
    badge: "border-violet-200 bg-violet-100 text-violet-700",
    accent: "from-violet-500/20 via-violet-200/40 to-white",
    selector: "bg-violet-500",
  },
  pink: {
    dot: "bg-pink-500",
    badge: "border-pink-200 bg-pink-100 text-pink-700",
    accent: "from-pink-500/20 via-pink-200/40 to-white",
    selector: "bg-pink-500",
  },
} as const;

export const STATUS_BADGE_STYLES = {
  active: "border-teal-200 bg-teal-50 text-teal-700",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  archived: "border-stone-200 bg-stone-100 text-stone-600",
  todo: "border-slate-200 bg-slate-100 text-slate-700",
  doing: "border-amber-200 bg-amber-100 text-amber-700",
  done: "border-emerald-200 bg-emerald-100 text-emerald-700",
  low: "border-slate-200 bg-slate-100 text-slate-700",
  medium: "border-orange-200 bg-orange-100 text-orange-700",
  high: "border-rose-200 bg-rose-100 text-rose-700",
} as const;
