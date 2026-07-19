import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";

import { MarketplaceStats } from "@/components/marketplace/MarketplaceStats";
import { OrderCard } from "@/components/marketplace/OrderCard";
import { SearchBar } from "@/components/marketplace/SearchBar";
import {
  StatusFilter,
  type StatusFilterValue,
} from "@/components/marketplace/StatusFilter";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Container } from "@/components/layout/Container";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { mockOrders } from "@/data/mockOrders";

export function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("All");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [order.title, order.buyer, order.seller ?? "", order.status]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus = status === "All" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [normalizedSearch, status]);

  return (
    <Container className="space-y-10 py-12">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
            Marketplace
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Discover trustless escrow orders.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Browse marketplace opportunities, inspect counterparties, and move
            orders through the escrow lifecycle with clear on-chain actions.
          </p>
        </div>

        <CreateOrderDialog />
      </section>

      <MarketplaceStats orders={mockOrders} />

      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <StatusFilter value={status} onChange={setStatus} />
        </div>

        {filteredOrders.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<ClipboardList size={22} />}
            title="No orders found"
            description="Try adjusting the search query or status filter. New escrow orders will appear here once they are indexed."
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setStatus("All");
                }}
              >
                Clear filters
              </Button>
            }
          />
        )}
      </section>
    </Container>
  );
}