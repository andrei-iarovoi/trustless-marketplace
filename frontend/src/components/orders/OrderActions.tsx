import {
  useAcceptOrder,
  useCancelOrder,
  useConfirmCompletion,
  useFundOrder,
} from "@/hooks/marketplace";
import { parseEther } from "viem";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { OrderStatus } from "@/types/order";

interface OrderActionsProps {
  orderId: number;
  budget: number;
  status: OrderStatus;
}

export function OrderActions({
  orderId,
  budget,
  status,
}: OrderActionsProps) {
  const {
    acceptOrder,
    isPending: isAcceptPending,
    isConfirming: isAcceptConfirming,
    error: acceptError,
  } = useAcceptOrder();

  const {
    fundOrder,
    isPending: isFundPending,
    isConfirming: isFundConfirming,
    error: fundError,
  } = useFundOrder();

  const {
    confirmCompletion,
    isPending: isCompletePending,
    isConfirming: isCompleteConfirming,
    error: completeError,
  } = useConfirmCompletion();

  const {
    cancelOrder,
    isPending: isCancelPending,
    isConfirming: isCancelConfirming,
    error: cancelError,
  } = useCancelOrder();

  const canAccept = status === "Open";
  const canFund = status === "Accepted";
  const canComplete = status === "Funded";
  const canCancel =
    status === "Open" ||
    status === "Accepted" ||
    status === "Funded";

  const isAccepting = isAcceptPending || isAcceptConfirming;
  const isFunding = isFundPending || isFundConfirming;
  const isCompleting =
    isCompletePending || isCompleteConfirming;
  const isCancelling =
    isCancelPending || isCancelConfirming;

  const handleAccept = () => {
    acceptOrder(orderId);
  };

  const handleFund = () => {
    fundOrder({
      orderId,
      amount: parseEther(budget.toString()),
    });
  };

  const handleComplete = () => {
    confirmCompletion(orderId);
  };

  const handleCancel = () => {
    cancelOrder(orderId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          className="w-full"
          disabled={!canAccept || isAccepting}
          onClick={handleAccept}
        >
          {isAccepting ? "Accepting Order..." : "Accept Order"}
        </Button>

        <Button
          className="w-full"
          disabled={!canFund || isFunding}
          onClick={handleFund}
        >
          {isFunding ? "Funding Escrow..." : "Fund Escrow"}
        </Button>

        <Button
          className="w-full"
          disabled={!canComplete || isCompleting}
          onClick={handleComplete}
        >
          {isCompleting
            ? "Completing Order..."
            : "Complete Order"}
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          disabled={!canCancel || isCancelling}
          onClick={handleCancel}
        >
          {isCancelling ? "Cancelling Order..." : "Cancel Order"}
        </Button>

        {acceptError && (
          <p className="text-sm text-destructive">
            {acceptError.message}
          </p>
        )}

        {fundError && (
          <p className="text-sm text-destructive">
            {fundError.message}
          </p>
        )}

        {completeError && (
          <p className="text-sm text-destructive">
            {completeError.message}
          </p>
        )}

        {cancelError && (
          <p className="text-sm text-destructive">
            {cancelError.message}
          </p>
        )}

        {isAcceptConfirming && (
          <p className="text-sm text-slate-400">
            Waiting for Accept transaction confirmation...
          </p>
        )}

        {isFundConfirming && (
          <p className="text-sm text-slate-400">
            Waiting for Fund transaction confirmation...
          </p>
        )}

        {isCompleteConfirming && (
          <p className="text-sm text-slate-400">
            Waiting for Complete transaction confirmation...
          </p>
        )}

        {isCancelConfirming && (
          <p className="text-sm text-slate-400">
            Waiting for Cancel transaction confirmation...
          </p>
        )}
      </CardContent>
    </Card>
  );
}