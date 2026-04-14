type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[28px] border border-dashed border-stone-300 bg-white/70 p-8 text-center">
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
    </div>
  );
}
