import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { OrderCard } from "@/components/marketplace/OrderCard";
import {
  SearchBar,
} from "@/components/marketplace/SearchBar";
import {
  StatusFilter,
  type StatusFilterValue,
} from "@/components/marketplace/StatusFilter";
import { Container } from "@/components/layout/Container";
import { mockOrders } from "@/data/mockOrders";

export function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("All");

  const orders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch = order.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <Container className="py-12">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Marketplace
          </h1>

          <p className="mt-2 text-slate-400">
            Browse escrow orders and start collaborating securely.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
          <Plus size={18} />
          Create Order
        </button>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar value={search} onChange={setSearch} />

        <StatusFilter
          value={status}
          onChange={setStatus}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>

      {orders.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center text-slate-400">
          No orders found.
        </div>
      )}
    </Container>
  );
}