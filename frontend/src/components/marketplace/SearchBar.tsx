import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search orders, wallets, or status"
        className="pl-10"
      />
    </div>
  );
}
