import { Fragment } from "react";
import { Check, Circle, CircleX } from "lucide-react";

import type { OrderStatus } from "@/types/order";

type OrderLifecycleProps = {
  status: OrderStatus;
};

type LifecycleStep = {
  status: Exclude<OrderStatus, "Cancelled">;
  description: string;
};

const lifecycleSteps: LifecycleStep[] = [
  {
    status: "Open",
    description: "Waiting for a freelancer to accept the order.",
  },
  {
    status: "Accepted",
    description: "Freelancer assigned, waiting for client funding.",
  },
  {
    status: "Funded",
    description: "ETH is locked in escrow until completion.",
  },
  {
    status: "Completed",
    description: "Work confirmed and escrow released.",
  },
];

export function OrderLifecycle({ status }: OrderLifecycleProps) {
  const currentStepIndex = lifecycleSteps.findIndex(
    (step) => step.status === status,
  );

  const isCancelled = status === "Cancelled";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-100">
          Escrow Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Follow the on-chain lifecycle from order creation to payout.
        </p>
      </div>

      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <CircleX className="size-5 text-red-400" />

          <div>
            <p className="font-medium text-red-300">Order Cancelled</p>

            <p className="text-sm text-slate-500">
              This escrow order is no longer active.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {lifecycleSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <Fragment key={step.status}>
                <div className="relative rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="flex items-center gap-3">
                    <StepIcon isCompleted={isCompleted} isCurrent={isCurrent} />

                    <span
                      className={
                        isCurrent
                          ? "font-medium text-cyan-300"
                          : isCompleted
                            ? "font-medium text-slate-200"
                            : "text-slate-500"
                      }
                    >
                      {step.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </section>
  );
}

type StepIconProps = {
  isCompleted: boolean;
  isCurrent: boolean;
};

function StepIcon({ isCompleted, isCurrent }: StepIconProps) {
  if (isCompleted) {
    return (
      <div className="flex size-8 items-center justify-center rounded-full bg-cyan-500 text-slate-950">
        <Check className="size-4" />
      </div>
    );
  }

  if (isCurrent) {
    return (
      <div className="flex size-8 items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-300">
        <Circle className="size-3 fill-current" />
      </div>
    );
  }

  return (
    <div className="flex size-8 items-center justify-center rounded-full border border-slate-700 text-slate-600">
      <Circle className="size-3 fill-current" />
    </div>
  );
}
