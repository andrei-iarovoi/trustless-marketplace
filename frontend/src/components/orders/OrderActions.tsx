import { useAcceptOrder } from "@/hooks/marketplace";

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
  status: OrderStatus;
}

export function OrderActions({
  orderId,
  status,
}: OrderActionsProps) {
  const {
    acceptOrder,
    isPending: isAcceptPending,
    isConfirming: isAcceptConfirming,
    error: acceptError,
  } = useAcceptOrder();

  const canAccept = status === "Open";
  const canFund = status === "Accepted";
  const canComplete = status === "Funded";
  const canCancel =
    status === "Open" ||
    status === "Accepted" ||
    status === "Funded";

  const handleAccept = () => {
    acceptOrder(orderId);
  };

  const isAccepting =
    isAcceptPending || isAcceptConfirming;

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
          disabled={!canFund}
          onClick={() => console.log("Fund Order")}
        >
          Fund Escrow
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

        {isAcceptConfirming && (
          <p className="text-sm text-slate-400">
            Waiting for transaction confirmation...
          </p>
        )}
      </CardContent>
    </Card>
  );
}