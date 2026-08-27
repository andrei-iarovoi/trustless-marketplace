import {
  ArrowLeft,
  CircleDollarSign,
  FileText,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useAccount } from "wagmi";

import { Container } from "@/components/layout/Container";
import { OrderActions } from "@/components/orders/OrderActions";
import { OrderDetailsSkeleton } from "@/components/orders/OrderDetailsSkeleton";
import { OrderLifecycle } from "@/components/orders/OrderLifecycle";
import { OrderParticipants } from "@/components/orders/OrderParticipants";
import { OrderRoleBadge } from "@/components/orders/OrderRoleBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { useOrder } from "@/hooks/marketplace";
import type { Order, OrderStatus } from "@/types/order";

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const { address } = useAccount();

  const id = Number(orderId);
  const isValidId = Number.isInteger(id) && id > 0;

  const { order, isLoading, error } = useOrder(isValidId ? id : undefined);

  if (!isValidId) {
    return <OrderNotFound />;
  }

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (error) {
    return <OrderLoadError />;
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <Container className="space-y-8 py-12">
      <Button asChild variant="ghost">
        <Link to="/marketplace">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>

      <section className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-slate-800/80 bg-slate-950/30">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                  <OrderRoleBadge order={order} address={address} />
                </div>

                <CardTitle className="break-words text-3xl text-slate-50 sm:text-4xl">
                  {order.description}
                </CardTitle>

                <p className="mt-3 text-sm text-slate-500">
                  Escrow #{order.id.toString().padStart(3, "0")}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            <OrderLifecycle status={order.status} />
            <OrderParticipants
              client={order.client}
              freelancer={order.freelancer}
              currentAddress={address}
            />
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <OrderSummary order={order} />
          <OrderActions
            orderId={order.id}
            amount={order.amount}
            client={order.client}
            freelancer={order.freelancer}
            status={order.status}
          />
        </aside>
      </section>
    </Container>
  );
}

function OrderLoadError() {
  return (
    <Container className="py-12">
      <EmptyState
        className="mx-auto max-w-2xl"
        icon={<ShieldCheck size={24} />}
        title="Unable to load order"
        description="Something went wrong while reading the order from the blockchain. Check your network and try again."
        action={
          <Button asChild>
            <Link to="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>
        }
      />
    </Container>
  );
}

function OrderNotFound() {
  return (
    <Container className="py-12">
      <EmptyState
        className="mx-auto max-w-2xl"
        icon={<FileText size={24} />}
        title="Order not found"
        description="The requested escrow order does not exist or has not been indexed yet."
        action={
          <Button asChild>
            <Link to="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>
        }
      />
    </Container>
  );
}

type OrderSummaryProps = {
  order: Order;
};

function OrderSummary({ order }: OrderSummaryProps) {
  const lockedLabel = order.status === "Funded" ? "Locked in escrow" : "Order amount";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-cyan-100/70">{lockedLabel}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">
                {order.amount} ETH
              </p>
            </div>

            <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
              <CircleDollarSign className="size-6" />
            </div>
          </div>
        </div>

        <div className="grid gap-3 text-sm">
          <SummaryRow label="Network" value="Sepolia" />
          <SummaryRow label="Asset" value="ETH" />
          <SummaryRow label="Escrow status" value={getEscrowState(order.status)} />
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
          <LockKeyhole className="mt-0.5 size-4 shrink-0 text-cyan-300" />
          Funds can only move through the smart contract lifecycle shown on this page.
        </div>
      </CardContent>
    </Card>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-200">{value}</span>
    </div>
  );
}

function getEscrowState(status: OrderStatus) {
  const states: Record<OrderStatus, string> = {
    Open: "Waiting for freelancer",
    Accepted: "Waiting for funding",
    Funded: "Funds locked",
    Completed: "Released",
    Cancelled: "Cancelled",
  };

  return states[status];
}

function getStatusVariant(status: OrderStatus) {
  const variants: Record<
    OrderStatus,
    "default" | "secondary" | "success" | "warning" | "destructive" | "outline"
  > = {
    Open: "success",
    Accepted: "secondary",
    Funded: "default",
    Completed: "outline",
    Cancelled: "destructive",
  };

  return variants[status];
}
