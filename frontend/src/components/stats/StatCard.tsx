import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "bg-slate-900/70 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-900",
        className,
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
              {value}
            </p>
          </div>

          {icon ? (
            <div className="flex size-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
              {icon}
            </div>
          ) : null}
        </div>

        <p className="mt-3 text-sm text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}
