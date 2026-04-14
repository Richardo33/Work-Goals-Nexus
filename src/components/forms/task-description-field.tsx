"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

type TaskDescriptionFieldProps = {
  id: string;
  name: string;
  label?: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
};

function prefixSelectedLines(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  prefix: string,
) {
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const lineEndIndex = value.indexOf("\n", selectionEnd);
  const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;

  const before = value.slice(0, lineStart);
  const selectedBlock = value.slice(lineStart, lineEnd);
  const after = value.slice(lineEnd);

  const nextBlock = selectedBlock
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");

  return {
    value: `${before}${nextBlock}${after}`,
    selectionStart: lineStart,
    selectionEnd: lineStart + nextBlock.length,
  };
}

function getCurrentLine(value: string, cursorPosition: number) {
  const lineStart = value.lastIndexOf("\n", cursorPosition - 1) + 1;
  const lineEndIndex = value.indexOf("\n", cursorPosition);
  const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;

  return {
    lineStart,
    lineEnd,
    line: value.slice(lineStart, lineEnd),
  };
}

export function TaskDescriptionField({
  id,
  name,
  label = "Description",
  defaultValue = "",
  rows = 3,
  placeholder = "Optional description",
}: TaskDescriptionFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function applyPrefix(prefix: string) {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const nextState = prefixSelectedLines(
      textarea.value,
      textarea.selectionStart,
      textarea.selectionEnd,
      prefix,
    );

    textarea.value = nextState.value;
    textarea.focus();
    textarea.setSelectionRange(nextState.selectionStart, nextState.selectionEnd);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    const textarea = textareaRef.current;

    if (!textarea || textarea.selectionStart !== textarea.selectionEnd) {
      return;
    }

    const { lineStart, line, lineEnd } = getCurrentLine(
      textarea.value,
      textarea.selectionStart,
    );

    const bulletMatch = line.match(/^(\s*-\s)(.*)$/);
    const numberedMatch = line.match(/^(\s*)(\d+)\.\s(.*)$/);

    if (!bulletMatch && !numberedMatch) {
      return;
    }

    event.preventDefault();

    let insertion = "\n";

    if (bulletMatch) {
      const [, prefix, content] = bulletMatch;

      if (content.trim().length > 0) {
        insertion = `\n${prefix}`;
      } else {
        textarea.value =
          textarea.value.slice(0, lineStart) + textarea.value.slice(lineEnd);
        textarea.setSelectionRange(lineStart, lineStart);
        return;
      }
    }

    if (numberedMatch) {
      const [, indent, number, content] = numberedMatch;

      if (content.trim().length > 0) {
        insertion = `\n${indent}${Number(number) + 1}. `;
      } else {
        textarea.value =
          textarea.value.slice(0, lineStart) + textarea.value.slice(lineEnd);
        textarea.setSelectionRange(lineStart, lineStart);
        return;
      }
    }

    const cursorPosition = textarea.selectionStart;
    textarea.value =
      textarea.value.slice(0, cursorPosition) +
      insertion +
      textarea.value.slice(cursorPosition);

    const nextCursorPosition = cursorPosition + insertion.length;
    textarea.setSelectionRange(nextCursorPosition, nextCursorPosition);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="ui-label">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(
              "rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100",
            )}
            onClick={() => applyPrefix("- ")}
          >
            Bullet list
          </button>
          <button
            type="button"
            className={cn(
              "rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100",
            )}
            onClick={() => applyPrefix("1. ")}
          >
            Numbered list
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        rows={rows}
        maxLength={1000}
        defaultValue={defaultValue}
        className="ui-textarea"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <p className="text-xs leading-5 text-stone-500">
        Gunakan tombol di atas atau tulis manual dengan format `- item` atau `1. item`.
      </p>
    </div>
  );
}
