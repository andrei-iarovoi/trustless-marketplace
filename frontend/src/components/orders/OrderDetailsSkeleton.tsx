import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsSkeleton() {
  return (
    <Container className="space-y-8 py-12">
      <Skeleton className="h-10 w-48" />

      <Card>
        <CardHeader className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-3">
            <Skeleton className="h-9 w-full max-w-xl" />

            <Skeleton className="h-5 w-28" />
          </div>

          <Skeleton className="h-7 w-20 rounded-full" />
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-8 flex-1" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}