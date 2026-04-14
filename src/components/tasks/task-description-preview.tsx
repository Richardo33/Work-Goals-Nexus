type TaskDescriptionPreviewProps = {
  value: string | null;
};

function parseDescription(value: string) {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const isBulletList = lines.every((line) => line.startsWith("- "));
  const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line));

  if (isBulletList) {
    return {
      type: "list" as const,
      text: lines.map((line) => line.slice(2).trim()).join(" • "),
    };
  }

  if (isNumberedList) {
    return {
      type: "list" as const,
      text: lines.map((line) => line.replace(/^\d+\.\s+/, "").trim()).join(" • "),
    };
  }

  return {
    type: "text" as const,
    text: value,
  };
}

export function TaskDescriptionPreview({ value }: TaskDescriptionPreviewProps) {
  if (!value) {
    return <p className="task-description-clamp text-sm leading-6 text-stone-600" />;
  }

  const parsed = parseDescription(value);

  if (!parsed) {
    return <p className="task-description-clamp text-sm leading-6 text-stone-600" />;
  }

  return (
    <p className="task-description-clamp whitespace-pre-line text-sm leading-6 text-stone-600">
      {parsed.text}
    </p>
  );
}
