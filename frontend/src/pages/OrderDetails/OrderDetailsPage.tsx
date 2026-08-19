import {
  ArrowLeft,
  CircleDollarSign,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { OrderActions } from "@/components/orders/OrderActions";
import { useOrder } from "@/hooks/marketplace";

function formatAddress(address?: string) {
  if (!address) {
    return "Not assigned";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function OrderDetailsPage() {
  const { orderId } = useParams();

  const id = Number(orderId);
  const isValidId = Number.isInteger(id) && id > 0;

  const {
    order,
    isLoading,
    error,
  } = useOrder(isValidId ? id : undefined);

  if (!isValidId) {
    return <OrderNotFound />;
  }

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center">
          <p className="text-slate-400">
            Loading order...
          </p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-12">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="space-y-6 py-10 text-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                Unable to load order
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Something went wrong while reading the order from the
                blockchain.
              </p>
            </div>

            <Button asChild>
              <Link to="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
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

      <Card>
        <CardHeader className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <CardTitle className="break-words text-3xl text-slate-50">
              {order.description}
            </CardTitle>

            <p className="mt-2 text-slate-500">
              Escrow #{order.id.toString().padStart(3, "0")}
            </p>
          </div>

          <Badge variant={getStatusVariant(order.status)}>
            {order.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={<CircleDollarSign className="h-5 w-5" />}
              label="Amount"
              value={`${order.amount} ETH`}
            />

            <InfoCard
              icon={<UserRound className="h-5 w-5" />}
              label="Client"
              value={formatAddress(order.client)}
            />

            <InfoCard
              icon={<UserRound className="h-5 w-5" />}
              label="Freelancer"
              value={formatAddress(order.freelancer)}
            />

            <InfoCard
              icon={<CircleDollarSign className="h-5 w-5" />}
              label="Status"
              value={order.status}
            />
          </div>

          <OrderActions
            orderId={order.id}
            amount={order.amount}
            client={order.client}
            freelancer={order.freelancer}
            status={order.status}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

function OrderNotFound() {
  return (
    <Container className="py-12">
      <Card className="mx-auto max-w-2xl">
        <CardContent className="space-y-6 py-10 text-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              Order not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The requested escrow order does not exist.
            </p>
          </div>

          <Button asChild>
            <Link to="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

function getStatusVariant(
  status: "Open" | "Accepted" | "Funded" | "Completed" | "Cancelled",
) {
  const variants = {
    Open: "success",
    Accepted: "secondary",
    Funded: "default",
    Completed: "outline",
    Cancelled: "destructive",
  } as const;

  return variants[status];
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-5">
      <div className="mb-3 text-cyan-400">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-all font-medium text-slate-100">
        {value}
      </p>
    </div>
  );
}