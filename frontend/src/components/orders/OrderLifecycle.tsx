import {
  Check,
  Circle,
  CircleX,
} from "lucide-react";

import type { OrderStatus } from "@/types/order";
import { Fragment } from "react";

type OrderLifecycleProps = {
  status: OrderStatus;
};

const lifecycleSteps: OrderStatus[] = [
  "Open",
  "Accepted",
  "Funded",
  "Completed",
];

export function OrderLifecycle({
  status,
}: OrderLifecycleProps) {
  const currentStepIndex = lifecycleSteps.indexOf(status);

  const isCancelled = status === "Cancelled";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-100">
          Order Lifecycle
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track the current stage of this escrow order.
        </p>
      </div>

      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <CircleX className="size-5 text-red-400" />

          <div>
            <p className="font-medium text-red-300">
              Order Cancelled
            </p>

            <p className="text-sm text-slate-500">
              This escrow order is no longer active.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
  {lifecycleSteps.map((step, index) => {
    const isCompleted = index < currentStepIndex;
    const isCurrent = index === currentStepIndex;

    return (
      <Fragment key={step}>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <StepIcon
            isCompleted={isCompleted}
            isCurrent={isCurrent}
          />

          <span
            className={
              isCurrent
                ? "font-medium text-cyan-300"
                : isCompleted
                  ? "font-medium text-slate-200"
                  : "text-slate-500"
            }
          >
            {step}
          </span>
        </div>

        {index < lifecycleSteps.length - 1 && (
          <div className="hidden h-px flex-1 bg-slate-800 sm:block" />
        )}
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

function StepIcon({
  isCompleted,
  isCurrent,
}: StepIconProps) {
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