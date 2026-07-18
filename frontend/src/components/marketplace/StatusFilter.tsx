import clsx from "clsx";

const filters = [
  "All",
  "Open",
  "Accepted",
  "Funded",
  "Completed",
] as const;

export type StatusFilterValue = (typeof filters)[number];

interface StatusFilterProps {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

export function StatusFilter({
  value,
  onChange,
}: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={clsx(
            "rounded-lg border px-4 py-2 text-sm transition",
            value === filter
              ? "border-cyan-500 bg-cyan-500 text-slate-950"
              : "border-slate-800 bg-slate-900 hover:border-slate-700"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}