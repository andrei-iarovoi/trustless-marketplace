import {
  ArrowRight,
  Calendar,
  CircleDollarSign,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order, OrderStatus } from "@/types/order";

type OrderCardProps = {
  order: Order;
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

function formatAddress(address?: string) {
  return address ?? "Not assigned";
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="group overflow-hidden bg-slate-900/75 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900 hover:shadow-cyan-500/10">
      <CardHeader className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
              <ShieldCheck size={22} />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-lg text-slate-50">
                {order.title}
              </CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Escrow #{order.id.toString().padStart(3, "0")}
              </p>
            </div>
          </div>

          <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
          <ParticipantRow label="Buyer" value={formatAddress(order.buyer)} />
          <ParticipantRow label="Seller" value={formatAddress(order.seller)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Metric
            icon={<CircleDollarSign size={18} />}
            label="Budget"
            value={`${order.budget} ETH`}
          />
          <Metric icon={<Calendar size={18} />} label="Deadline" value={order.deadline} />
        </div>

        <Button asChild className="w-full justify-between" variant="secondary">
          <Link to={`/orders/${order.id}`}>
            View details
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

type ParticipantRowProps = {
  label: string;
  value: string;
};

function ParticipantRow({ label, value }: ParticipantRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <UserRound size={16} className="text-slate-500" />
      <span className="text-slate-400">{label}</span>
      <span className="ml-auto font-medium text-slate-200">{value}</span>
    </div>
  );
}

type MetricProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function Metric({ icon, label, value }: MetricProps) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
      <div className="mb-3 text-cyan-300">{icon}</div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-100">{value}</p>
    </div>
  );
}
