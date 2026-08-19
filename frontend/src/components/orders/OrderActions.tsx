import { useAcceptOrder, useFundOrder } from "@/hooks/marketplace";
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

  const canAccept = status === "Open";
  const canFund = status === "Accepted";
  const canComplete = status === "Funded";
  const canCancel =
    status === "Open" ||
    status === "Accepted" ||
    status === "Funded";

  const isAccepting =
    isAcceptPending || isAcceptConfirming;

  const isFunding =
    isFundPending || isFundConfirming;

  const handleAccept = () => {
    acceptOrder(orderId);
  };

  const handleFund = () => {
    fundOrder({
      orderId,
      amount: parseEther(budget.toString()),
    });
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
          disabled={!canComplete}
          onClick={() => console.log("Complete Order")}
        >
          Complete Order
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          disabled={!canCancel}
          onClick={() => console.log("Cancel Order")}
        >
          Cancel Order
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
      </CardContent>
    </Card>
  );
}