import { Button } from "@/components/ui/button";

const filters = [
  "All",
  "Open",
  "Accepted",
  "Funded",
  "Completed",
  "Cancelled",
] as const;

export type StatusFilterValue = (typeof filters)[number];

type StatusFilterProps = {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter}
          type="button"
          size="sm"
          variant={value === filter ? "default" : "secondary"}
          onClick={() => onChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
