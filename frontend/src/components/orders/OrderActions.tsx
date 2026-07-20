import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OrderStatus = "Open" | "Accepted" | "Funded" | "Completed" | "Cancelled";

interface OrderActionsProps {
  status: OrderStatus;
}

export function OrderActions({ status }: OrderActionsProps) {
  const canAccept = status === "Open";
  const canFund = status === "Accepted";
  const canComplete = status === "Funded";
  const canCancel =
    status === "Open" || status === "Accepted" || status === "Funded";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          className="w-full"
          disabled={!canAccept}
          onClick={() => console.log("Accept Order")}
        >
          Accept Order
        </Button>

        <Button
          className="w-full"
          disabled={!canFund}
          onClick={() => console.log("Fund Escrow")}
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
      </CardContent>
    </Card>
  );
}