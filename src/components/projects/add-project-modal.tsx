"use client";

import { useRef } from "react";

import { ProjectForm } from "@/components/forms/project-form";

type AddProjectModalProps = {
  redirectTo: string;
};

export function AddProjectModal({ redirectTo }: AddProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" className="ui-button-primary" onClick={openModal}>
        Add project
      </button>

      <dialog
        ref={dialogRef}
        className="ui-modal"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeModal();
          }
        }}
      >
        <div className="ui-card w-full max-w-2xl p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                Add project
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Create a new project workspace.
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

          <ProjectForm mode="create" redirectTo={redirectTo} />

          <div className="mt-5 flex justify-end">
            <button type="button" onClick={closeModal} className="ui-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
