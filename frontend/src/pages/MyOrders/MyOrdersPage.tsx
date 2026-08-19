import { useMemo, useState } from "react";
import { ClipboardList, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { useAccount } from "wagmi";

import { useOrders } from "@/hooks/marketplace";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/marketplace/SearchBar";
import {
  StatusFilter,
  type StatusFilterValue,
} from "@/components/marketplace/StatusFilter";

import type { Order, OrderStatus } from "@/types/order";

type OrderRole = "All" | "Created" | "Freelancer";

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

export function MyOrdersPage() {
  const { address } = useAccount();
  const { orders, isLoading } = useOrders();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("All");
  const [role, setRole] = useState<OrderRole>("All");

  const normalizedAddress = address?.toLowerCase();
  const normalizedSearch = search.trim().toLowerCase();

  const myOrders = useMemo(() => {
    if (!normalizedAddress) {
      return [];
    }

    return orders.filter((order) => {
      const isCreator =
        order.client.toLowerCase() === normalizedAddress;

      const isFreelancer =
        order.freelancer?.toLowerCase() === normalizedAddress;

      if (role === "Created") {
        return isCreator;
      }

      if (role === "Freelancer") {
        return isFreelancer;
      }

      return isCreator || isFreelancer;
    });
  }, [orders, normalizedAddress, role]);

  const filteredOrders = useMemo(() => {
    return myOrders.filter((order) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          order.id.toString(),
          order.client,
          order.freelancer ?? "",
          order.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        status === "All" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [myOrders, normalizedSearch, status]);

  if (!address) {
    return (
      <Container className="space-y-8 py-12">
        <section>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
            My Orders
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Your escrow orders.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Connect your wallet to view orders associated with your account.
          </p>
        </section>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShieldCheck size={28} className="text-slate-600" />

            <h2 className="mt-4 text-lg font-medium text-slate-200">
              Wallet not connected
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Connect your wallet to access your orders.
            </p>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="space-y-10 py-12">
      <section>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
          My Orders
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          Your escrow orders.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Manage orders you created and orders where you are assigned as the
          freelancer.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar value={search} onChange={setSearch} />

          <StatusFilter value={status} onChange={setStatus} />
        </div>

        <div className="flex flex-wrap gap-2">
          <RoleButton
            active={role === "All"}
            onClick={() => setRole("All")}
          >
            All Orders
          </RoleButton>

          <RoleButton
            active={role === "Created"}
            onClick={() => setRole("Created")}
          >
            Created by Me
          </RoleButton>

          <RoleButton
            active={role === "Freelancer"}
            onClick={() => setRole("Freelancer")}
          >
            As Freelancer
          </RoleButton>
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-slate-500">
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList size={28} className="text-slate-600" />

            <h2 className="mt-4 text-lg font-medium text-slate-200">
              No orders found
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              No orders match the selected filters. Try changing the status,
              role, or search query.
            </p>

            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setSearch("");
                setStatus("All");
                setRole("All");
              }}
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <MyOrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </Container>
  );
}

type RoleButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function RoleButton({
  active,
  onClick,
  children,
}: RoleButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "secondary"}
      size="sm"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

type MyOrderRowProps = {
  order: Order;
};

function MyOrderRow({ order }: MyOrderRowProps) {
  return (
    <Card className="group transition duration-200 hover:border-cyan-500/30 hover:bg-slate-900/80">
      <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
            <ShieldCheck size={20} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="truncate font-medium text-slate-100">
                {order.description}
              </h2>

              <Badge variant={statusVariant[order.status]}>
                {order.status}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span>
                Escrow #{order.id.toString().padStart(3, "0")}
              </span>

              <span>•</span>

              <span>
                {order.amount} ETH
              </span>
            </div>
          </div>
        </div>

        <Button asChild variant="secondary" className="shrink-0">
          <Link to={`/orders/${order.id}`}>
            View details
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}