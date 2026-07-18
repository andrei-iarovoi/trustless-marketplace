import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import type { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

const statusColors: Record<Order["status"], string> = {
  Open: "bg-emerald-500/15 text-emerald-400",
  Accepted: "bg-sky-500/15 text-sky-400",
  Funded: "bg-cyan-500/15 text-cyan-400",
  Completed: "bg-violet-500/15 text-violet-400",
  Cancelled: "bg-red-500/15 text-red-400",
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/50">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{order.title}</h3>

          <p className="mt-2 text-sm text-slate-400">
            Buyer: {order.buyer}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Budget</p>
          <p className="mt-1 font-semibold">{order.budget} ETH</p>
        </div>

        <div>
          <p className="text-slate-500">Deadline</p>
          <p className="mt-1 font-semibold">{order.deadline}</p>
        </div>
      </div>

      <Link
        to={`/order/${order.id}`}
        className="inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
      >
        View Details
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}