import {
  ArrowLeft,
  CircleDollarSign,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { OrderActions } from "@/components/orders/OrderActions";
import { useOrder } from "@/hooks/marketplace";

function formatAddress(address?: string) {
  if (!address) return "Not assigned";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function OrderDetailsPage() {
  const { orderId } = useParams();

  const id = Number(orderId);

  const { order, isLoading } = useOrder(id);

  if (isLoading) {
    return (
      <Container className="py-12 text-center text-slate-400">
        Loading order...
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-12">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="space-y-6 py-10 text-center">
            <h1 className="text-2xl font-bold">
              Order not found
            </h1>

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

  return (
    <Container className="space-y-8 py-12">
      <Button asChild variant="ghost">
        <Link to="/marketplace">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-6">
          <div>
            <CardTitle className="text-3xl">
              {order.description}
            </CardTitle>

            <p className="mt-2 text-slate-500">
              Escrow #{order.id.toString().padStart(3, "0")}
            </p>
          </div>

          <Badge>{order.status}</Badge>
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

          <OrderActions status={order.status} />
        </CardContent>
      </Card>
    </Container>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="rounded-xl border p-5">
      <div className="mb-3 text-cyan-400">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-all font-medium">
        {value}
      </p>
    </div>
  );
}