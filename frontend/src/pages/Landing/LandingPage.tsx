import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Handshake,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Link } from "react-router";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrders } from "@/hooks/marketplace";

const workflowSteps = [
  {
    title: "Create order",
    description: "A client publishes the brief and defines the escrow amount.",
    icon: FileCheck2,
  },
  {
    title: "Accept work",
    description: "A freelancer accepts the order and becomes the counterparty.",
    icon: Handshake,
  },
  {
    title: "Fund escrow",
    description: "Funds are locked on Sepolia before delivery starts.",
    icon: LockKeyhole,
  },
  {
    title: "Complete payout",
    description: "The client confirms delivery and releases the payment on-chain.",
    icon: BadgeCheck,
  },
];

const benefits = [
  "No custodial backend",
  "Clear order lifecycle",
  "Role-based transaction actions",
  "Sepolia Etherscan visibility",
  "Wallet-native authentication",
  "Reusable production UI system",
];

export function LandingPage() {
  const { orders } = useOrders();

  const openOrders = orders.filter((order) => order.status === "Open").length;
  const fundedOrders = orders.filter((order) => order.status === "Funded").length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;
  const lockedValue = orders
    .filter((order) => order.status === "Funded")
    .reduce((total, order) => total + order.amount, 0);

  const stats = [
    {
      label: "Total orders",
      value: orders.length.toString(),
    },
    {
      label: "Open orders",
      value: openOrders.toString(),
    },
    {
      label: "Locked escrow",
      value: `${lockedValue.toFixed(4)} ETH`,
    },
    {
      label: "Completed",
      value: completedOrders.toString(),
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-foreground">
      <Header />

      <section className="relative border-b border-border/70 px-6 py-20 sm:py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.10),transparent_34rem),linear-gradient(180deg,#07111d_0%,#05070a_44%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
              <Sparkles className="size-3.5" />
              Trustless Web3 Escrow
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
              Trustless Marketplace
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              A production-style escrow dApp for clients and freelancers. Create
              orders, lock ETH in smart contract escrow, and release payments
              through transparent on-chain actions.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link to="/marketplace">
                  Launch App
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Button asChild variant="secondary" size="lg">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              <TrustPill icon={ShieldCheck} label="Sepolia deployed" />
              <TrustPill icon={Wallet} label="Wallet native" />
              <TrustPill icon={Clock3} label="Live lifecycle" />
            </div>
          </div>

          <EscrowPreview fundedOrders={fundedOrders} lockedValue={lockedValue} />
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Protocol Flow"
            title="Escrow without a middleman."
            description="Every order moves through a small, auditable lifecycle. The UI keeps each role focused on the next valid action."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <WorkflowCard key={step.title} step={step} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-slate-950/55 px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <SectionIntro
            eyebrow="Product Quality"
            title="Built like a real Web3 product."
            description="The frontend separates pages, components, hooks and contract services, so the app can grow without rewriting the UI."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 text-sm text-slate-300"
              >
                <ShieldCheck className="size-4 text-cyan-300" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Marketplace Stats"
            title="Live protocol snapshot."
            description="These numbers are read from the same marketplace data used inside the app."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-card/80">
                <CardContent className="p-5">
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">
              Ready to inspect the dApp
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
              Browse live escrow orders on Sepolia.
            </h2>
          </div>

          <Button asChild size="lg">
            <Link to="/marketplace">Open Marketplace</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400">{description}</p>
    </div>
  );
}

type TrustPillProps = {
  icon: typeof ShieldCheck;
  label: string;
};

function TrustPill({ icon: Icon, label }: TrustPillProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm text-slate-300">
      <Icon className="size-4 text-cyan-300" />
      {label}
    </div>
  );
}

type EscrowPreviewProps = {
  fundedOrders: number;
  lockedValue: number;
};

function EscrowPreview({ fundedOrders, lockedValue }: EscrowPreviewProps) {
  return (
    <Card className="relative overflow-hidden bg-card/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <CardContent className="space-y-6 p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Escrow Contract</p>
            <p className="mt-1 font-mono text-sm text-slate-200">
              0x7728...5702
            </p>
          </div>
          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Sepolia
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Locked Value</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-50">
                {lockedValue.toFixed(4)} ETH
              </p>
            </div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
              <CircleDollarSign className="size-7" />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <MiniMetric label="Funded orders" value={fundedOrders.toString()} />
          <MiniMetric label="Network" value="Sepolia" />
        </div>

        <div className="space-y-3">
          {["Open", "Accepted", "Funded", "Completed"].map((status) => (
            <div key={status} className="flex items-center gap-3 text-sm">
              <span className="size-2 rounded-full bg-cyan-300" />
              <span className="text-slate-300">{status}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type MiniMetricProps = {
  label: string;
  value: string;
};

function MiniMetric({ label, value }: MiniMetricProps) {
  return (
    <div className="rounded-2xl border border-border bg-slate-950/50 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-50">{value}</p>
    </div>
  );
}

type WorkflowCardProps = {
  step: (typeof workflowSteps)[number];
  index: number;
};

function WorkflowCard({ step, index }: WorkflowCardProps) {
  const Icon = step.icon;

  return (
    <Card className="bg-card/80 transition hover:-translate-y-1 hover:border-cyan-400/30">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
            <Icon className="size-5" />
          </div>
          <span className="font-mono text-xs text-muted">0{index}</span>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-slate-50">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {step.description}
        </p>
      </CardContent>
    </Card>
  );
}
