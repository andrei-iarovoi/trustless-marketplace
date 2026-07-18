import { CircleDollarSign, Layers3, ShieldCheck, TrendingUp } from "lucide-react";

import { StatCard } from "@/components/stats/StatCard";
import type { Order } from "@/types/order";

type MarketplaceStatsProps = {
  orders: Order[];
};

export function MarketplaceStats({ orders }: MarketplaceStatsProps) {
  const openOrders = orders.filter((order) => order.status === "Open").length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;
  const lockedValue = orders
    .filter((order) => order.status === "Funded")
    .reduce((total, order) => total + order.budget, 0);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Open Orders"
        value={openOrders.toString()}
        description="Available for freelancers"
        icon={<Layers3 size={18} />}
      />
      <StatCard
        title="Locked Value"
        value={`${lockedValue.toFixed(1)} ETH`}
        description="Currently secured in escrow"
        icon={<ShieldCheck size={18} />}
      />
      <StatCard
        title="Completed"
        value={completedOrders.toString()}
        description="Successfully finished"
        icon={<TrendingUp size={18} />}
      />
      <StatCard
        title="Platform Fee"
        value="1%"
        description="Escrow commission"
        icon={<CircleDollarSign size={18} />}
      />
    </section>
  );
}
