import { Container } from "@/components/layout/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsSkeleton() {
  return (
    <Container className="space-y-8 py-12">
      <Skeleton className="h-10 w-48" />

      <section className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <Card>
          <CardHeader className="space-y-4 border-b border-slate-800/80 bg-slate-950/30">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>

            <Skeleton className="h-10 w-full max-w-2xl" />
            <Skeleton className="h-5 w-28" />
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
              <div className="mb-6 space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-80 max-w-full" />
              </div>

              <div className="grid gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-32 rounded-2xl" />
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-44 rounded-2xl" />
              <Skeleton className="h-44 rounded-2xl" />
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </aside>
      </section>
    </Container>
  );
}
