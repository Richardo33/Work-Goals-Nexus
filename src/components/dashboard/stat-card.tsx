type StatCardProps = {
  label: string;
  value: number;
  helper: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="ui-card p-5">
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-stone-600">{helper}</p>
    </div>
  );
}
