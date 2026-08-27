import { Wallet } from "lucide-react";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Container } from "@/components/ui/Container";
import { useMyOrders, useWalletBalance } from "@/hooks/dashboard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { EmptyState } from "@/components/ui/empty-state";

export function DashboardPage() {
  const {
    address,
    balance,
    isLoading: isBalanceLoading,
  } = useWalletBalance();

  const {
    orders,
    isLoading: isOrdersLoading,
  } = useMyOrders();

  const isLoading = isBalanceLoading || isOrdersLoading;

  if (!address) {
    return (
      <Container className="space-y-8 py-12">
        <section className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
            Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Your Web3 workspace.
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-400">
            Connect your wallet to view your balance and escrow activity.
          </p>
        </section>

        <EmptyState
          className="max-w-xl"
          icon={<Wallet size={24} />}
          title="Wallet not connected"
          description="Connect your wallet to view your balance, escrow orders, and recent marketplace activity."
        />
      </Container>
    );
  }

  return (
    <Container className="space-y-10 py-12">
      <section className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
            Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Your Web3 workspace.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Track your wallet, escrow orders, and marketplace activity from
            one place.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Connected wallet:</span>

          <span className="font-mono text-slate-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      </section>

      {isLoading ? (
            <DashboardSkeleton />
            ) : (
        <div className="space-y-8">
            <DashboardStats
             orders={orders}
             balance={balance}
        />

            <RecentOrders orders={orders} />
       </div>
      )}
    </Container>
  );
}