import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <Skeleton className="h-4 w-24" />

            <Skeleton className="mt-4 h-8 w-32" />
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-48 max-w-full" />
                <Skeleton className="h-4 w-28" />
              </div>

              <Skeleton className="h-7 w-20 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}