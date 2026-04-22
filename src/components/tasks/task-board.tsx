"use client";

import { useEffect, useRef, useState } from "react";

import { TaskForm } from "@/components/forms/task-form";
import { KanbanColumn } from "@/components/tasks/kanban-column";
import type { Task } from "@/lib/types";

type TaskBoardProps = {
  projectId: string;
  redirectTo: string;
  tasks: Task[];
};

export function TaskBoard({ projectId, redirectTo, tasks }: TaskBoardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const editingTask =
    editingTaskId === null ? null : tasks.find((task) => task.id === editingTaskId) ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (editingTask) {
      if (!dialog.open) {
        dialog.showModal();
      }

      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [editingTask]);

  function closeModal() {
    setEditingTaskId(null);
  }

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-3">
        <KanbanColumn
          status="todo"
          tasks={todoTasks}
          projectId={projectId}
          redirectTo={redirectTo}
          onEditTask={setEditingTaskId}
        />
        <KanbanColumn
          status="doing"
          tasks={doingTasks}
          projectId={projectId}
          redirectTo={redirectTo}
          onEditTask={setEditingTaskId}
        />
        <KanbanColumn
          status="done"
          tasks={doneTasks}
          projectId={projectId}
          redirectTo={redirectTo}
          onEditTask={setEditingTaskId}
        />
      </section>

      <dialog
        ref={dialogRef}
        className="ui-modal"
        onClose={closeModal}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeModal();
          }
        }}
      >
        {editingTask ? (
          <div className="ui-card w-full max-w-2xl p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                  Edit task
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Update the task details without leaving the board.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
                aria-label="Close modal"
              >
                x
              </button>
            </div>

            <TaskForm
              mode="edit"
              projectId={projectId}
              redirectTo={redirectTo}
              task={editingTask}
            />

            <div className="mt-5 flex justify-end">
              <button type="button" onClick={closeModal} className="ui-button-secondary">
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
