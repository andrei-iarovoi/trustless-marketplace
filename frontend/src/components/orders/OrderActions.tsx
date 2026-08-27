import { Info, Loader2 } from "lucide-react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import {
  useAcceptOrder,
  useCancelOrder,
  useConfirmCompletion,
  useFundOrder,
} from "@/hooks/marketplace";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { OrderStatus } from "@/types/order";

type ActionState = {
  label: string;
  loadingLabel: string;
  canRun: boolean;
  isLoading: boolean;
  reason: string;
  variant?: "default" | "destructive";
  onClick: () => void;
};

interface OrderActionsProps {
  orderId: number;
  amount: number;
  client: string;
  freelancer?: string;
  status: OrderStatus;
}

export function OrderActions({
  orderId,
  amount,
  client,
  freelancer,
  status,
}: OrderActionsProps) {
  const { address } = useAccount();

  const {
    acceptOrder,
    isPending: isAcceptPending,
    isConfirming: isAcceptConfirming,
  } = useAcceptOrder();

  const {
    fundOrder,
    isPending: isFundPending,
    isConfirming: isFundConfirming,
  } = useFundOrder();

  const {
    confirmCompletion,
    isPending: isCompletePending,
    isConfirming: isCompleteConfirming,
  } = useConfirmCompletion();

  const {
    cancelOrder,
    isPending: isCancelPending,
    isConfirming: isCancelConfirming,
  } = useCancelOrder();

  const normalizedAddress = address?.toLowerCase();
  const normalizedClient = client.toLowerCase();
  const normalizedFreelancer = freelancer?.toLowerCase();

  const isClient = normalizedAddress === normalizedClient;
  const isFreelancer = normalizedAddress === normalizedFreelancer;

  const isAccepting = isAcceptPending || isAcceptConfirming;
  const isFunding = isFundPending || isFundConfirming;
  const isCompleting = isCompletePending || isCompleteConfirming;
  const isCancelling = isCancelPending || isCancelConfirming;

  const isTransactionPending =
    isAccepting || isFunding || isCompleting || isCancelling;

  const actions: ActionState[] = [
    {
      label: "Accept Order",
      loadingLabel: "Accepting Order...",
      canRun: status === "Open" && !!address && !isClient,
      isLoading: isAccepting,
      reason: getActionReason({
        address,
        status,
        allowedStatus: "Open",
        isBlockedRole: isClient,
        blockedRoleReason: "Clients cannot accept their own orders.",
      }),
      onClick: () => acceptOrder(orderId),
    },
    {
      label: "Fund Escrow",
      loadingLabel: "Funding Escrow...",
      canRun: status === "Accepted" && !!address && isClient,
      isLoading: isFunding,
      reason: getActionReason({
        address,
        status,
        allowedStatus: "Accepted",
        isMissingRole: !isClient,
        missingRoleReason: "Only the client can fund this escrow.",
      }),
      onClick: () => fundOrder({ orderId, amount: parseEther(amount.toString()) }),
    },
    {
      label: "Complete Order",
      loadingLabel: "Completing Order...",
      canRun: status === "Funded" && !!address && isClient,
      isLoading: isCompleting,
      reason: getActionReason({
        address,
        status,
        allowedStatus: "Funded",
        isMissingRole: !isClient,
        missingRoleReason: "Only the client can release funds.",
      }),
      onClick: () => void confirmCompletion(orderId),
    },
    {
      label: "Cancel Order",
      loadingLabel: "Cancelling Order...",
      canRun:
        !!address &&
        isClient &&
        (status === "Open" || status === "Accepted" || status === "Funded"),
      isLoading: isCancelling,
      reason: getCancelReason({ address, status, isClient }),
      variant: "destructive",
      onClick: () => cancelOrder(orderId),
    },
  ];

  const activeAction = actions.find((action) => action.canRun);
  const roleLabel = !address
    ? "Connect wallet to continue"
    : isClient
      ? "You are the client"
      : isFreelancer
        ? "You are the freelancer"
        : "You can accept open orders";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Actions</CardTitle>
        <p className="text-sm text-slate-500">{roleLabel}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {!activeAction ? (
          <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
            <Info className="mt-0.5 size-4 shrink-0 text-cyan-300" />
            {getNoActionMessage({ address, status, isClient, isFreelancer })}
          </div>
        ) : null}

        {actions.map((action) => (
          <ActionButton
            key={action.label}
            action={action}
            disabled={isTransactionPending || !action.canRun}
          />
        ))}

      </CardContent>
    </Card>
  );
}

type ActionButtonProps = {
  action: ActionState;
  disabled: boolean;
};

function ActionButton({ action, disabled }: ActionButtonProps) {
  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        variant={action.variant}
        disabled={disabled}
        onClick={action.onClick}
      >
        {action.isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
        {action.isLoading ? action.loadingLabel : action.label}
      </Button>

      {!action.canRun && action.reason ? (
        <p className="px-1 text-xs text-slate-500">{action.reason}</p>
      ) : null}
    </div>
  );
}

type ActionReasonParams = {
  address?: string;
  status: OrderStatus;
  allowedStatus: OrderStatus;
  isBlockedRole?: boolean;
  blockedRoleReason?: string;
  isMissingRole?: boolean;
  missingRoleReason?: string;
};

function getActionReason({
  address,
  status,
  allowedStatus,
  isBlockedRole,
  blockedRoleReason,
  isMissingRole,
  missingRoleReason,
}: ActionReasonParams) {
  if (!address) {
    return "Connect your wallet to use this action.";
  }

  if (status !== allowedStatus) {
    return `Available when order status is ${allowedStatus}.`;
  }

  if (isBlockedRole) {
    return blockedRoleReason ?? "Your role cannot use this action.";
  }

  if (isMissingRole) {
    return missingRoleReason ?? "Your wallet is not allowed to use this action.";
  }

  return "";
}

type CancelReasonParams = {
  address?: string;
  status: OrderStatus;
  isClient: boolean;
};

function getCancelReason({ address, status, isClient }: CancelReasonParams) {
  if (!address) {
    return "Connect your wallet to use this action.";
  }

  if (!isClient) {
    return "Only the client can cancel this order.";
  }

  if (status === "Completed" || status === "Cancelled") {
    return "Finalized orders cannot be cancelled.";
  }

  return "";
}

type NoActionMessageParams = {
  address?: string;
  status: OrderStatus;
  isClient: boolean;
  isFreelancer: boolean;
};

function getNoActionMessage({
  address,
  status,
  isClient,
  isFreelancer,
}: NoActionMessageParams) {
  if (!address) {
    return "Connect your wallet to see which escrow actions are available for your role.";
  }

  if (status === "Completed") {
    return "This escrow has been completed and funds have been released.";
  }

  if (status === "Cancelled") {
    return "This escrow has been cancelled and no further actions are available.";
  }

  if (isFreelancer) {
    return "The next on-chain action belongs to the client.";
  }

  if (isClient) {
    return "No client action is available for the current order status.";
  }

  return "No action is currently available for your wallet.";
}
