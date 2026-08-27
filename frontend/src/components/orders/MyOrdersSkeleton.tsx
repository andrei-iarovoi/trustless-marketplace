import { Skeleton } from "@/components/ui/skeleton";

export function MyOrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <Skeleton className="size-11 shrink-0 rounded-xl" />

              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-5 w-72 max-w-full" />
                <Skeleton className="h-4 w-44 max-w-full" />
              </div>
            </div>

            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
