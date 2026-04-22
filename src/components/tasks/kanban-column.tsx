import { TaskCard } from "@/components/tasks/task-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { STATUS_BADGE_STYLES, TASK_STATUS_LABELS } from "@/lib/constants";
import type { Task, TaskStatus } from "@/lib/types";

type KanbanColumnProps = {
  onEditTask: (taskId: string) => void;
  status: TaskStatus;
  tasks: Task[];
  projectId: string;
  redirectTo: string;
};

export function KanbanColumn({
  onEditTask,
  status,
  tasks,
  projectId,
  redirectTo,
}: KanbanColumnProps) {
  return (
    <section className="flex min-h-[320px] flex-col rounded-[28px] border border-stone-200 bg-white/70 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge className={STATUS_BADGE_STYLES[status]}>{TASK_STATUS_LABELS[status]}</Badge>
        <span className="text-sm font-medium text-stone-500">{tasks.length} tasks</span>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              projectId={projectId}
              redirectTo={redirectTo}
              onEditTask={onEditTask}
            />
          ))
        ) : (
          <EmptyState
            title="Nothing here yet"
            description={`No tasks in ${TASK_STATUS_LABELS[status].toLowerCase()} for this filter set.`}
          />
        )}
      </div>
    </section>
  );
}
