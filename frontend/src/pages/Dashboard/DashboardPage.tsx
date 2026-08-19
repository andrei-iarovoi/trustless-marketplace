import { Wallet } from "lucide-react";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Container } from "@/components/ui/Container";
import { useMyOrders, useWalletBalance } from "@/hooks/dashboard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";

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

        <div className="flex max-w-xl items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
            <Wallet size={22} />
          </div>

          <div>
            <p className="font-medium text-slate-100">
              Wallet not connected
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Connect your wallet to access your dashboard.
            </p>
          </div>
        </div>
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
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-500">
          Loading dashboard...
        </div>
      ) : (
        <div className="space-y-8">
            <DashboardStats
             orders={orders}
             balance={balance}
             address={address}
        />

            <RecentOrders orders={orders} />
       </div>
      )}
    </Container>
  );
}