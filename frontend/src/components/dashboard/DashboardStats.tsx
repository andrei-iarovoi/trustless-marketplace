import {
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Wallet,
} from "lucide-react";

import { StatCard } from "@/components/stats/StatCard";
import type { Order } from "@/types/order";

type DashboardStatsProps = {
  orders: Order[];
  balance: string;
};

export function DashboardStats({
  orders,
  balance,
}: DashboardStatsProps) {
  const myOrders = orders.length;

  const acceptedOrders = orders.filter(
    (order) => order.status === "Accepted",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Wallet Balance"
        value={`${Number(balance).toFixed(4)} ETH`}
        description="Available wallet balance"
        icon={<Wallet size={18} />}
      />

      <StatCard
        title="My Orders"
        value={myOrders.toString()}
        description="Orders associated with your wallet"
        icon={<ClipboardList size={18} />}
      />

      <StatCard
        title="Accepted"
        value={acceptedOrders.toString()}
        description="Orders currently accepted"
        icon={<CircleDollarSign size={18} />}
      />

      <StatCard
        title="Completed"
        value={completedOrders.toString()}
        description="Successfully completed"
        icon={<CheckCircle2 size={18} />}
      />
    </section>
  );
}