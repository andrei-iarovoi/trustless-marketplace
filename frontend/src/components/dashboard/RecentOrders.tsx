import { ArrowRight, CircleDollarSign, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Order, OrderStatus } from "@/types/order";

type RecentOrdersProps = {
  orders: Order[];
};

const statusVariant: Record<
  OrderStatus,
  "default" | "secondary" | "success" | "warning" | "destructive" | "outline"
> = {
  Open: "success",
  Accepted: "secondary",
  Funded: "default",
  Completed: "outline",
  Cancelled: "destructive",
};

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const recentOrders = [...orders]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Your latest escrow activity
          </p>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link to="/marketplace">
            View all
            <ArrowRight size={16} />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {recentOrders.length === 0 ? (
          <EmptyState
            className="py-10"
            icon={<ShieldCheck size={24} />}
            title="No orders yet"
            description="Your escrow orders will appear here after you create or accept an order."
          />
        ) : (
          <div className="divide-y divide-slate-800">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    <ShieldCheck size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-100">
                      {order.description}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>
                        Escrow #{order.id.toString().padStart(3, "0")}
                      </span>

                      <span>•</span>

                      <span>
                        {formatAddress(order.client)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <CircleDollarSign
                      size={16}
                      className="text-cyan-300"
                    />
                    {order.amount} ETH
                  </div>

                  <Badge variant={statusVariant[order.status]}>
                    {order.status}
                  </Badge>

                  <Button asChild variant="ghost" size="icon">
                    <Link to={`/orders/${order.id}`}>
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}