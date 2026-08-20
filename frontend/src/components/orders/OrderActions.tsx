import { parseEther } from "viem";
import { useAccount } from "wagmi";

import {
  useAcceptOrder,
  useCancelOrder,
  useConfirmCompletion,
  useFundOrder,
} from "@/hooks/marketplace";

import { TransactionStatus } from "@/components/web3/TransactionStatus";

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
  amount: number;
  client: string;
  status: OrderStatus;
}

export function OrderActions({
  orderId,
  amount,
  client,
  status,
}: OrderActionsProps) {
  const { address } = useAccount();

  const {
    acceptOrder,
    hash: acceptHash,
    isPending: isAcceptPending,
    isConfirming: isAcceptConfirming,
    isSuccess: isAcceptSuccess,
    error: acceptError,
  } = useAcceptOrder();

  const {
    fundOrder,
    hash: fundHash,
    isPending: isFundPending,
    isConfirming: isFundConfirming,
    isSuccess: isFundSuccess,
    error: fundError,
  } = useFundOrder();

  const {
    confirmCompletion,
    hash: completeHash,
    isPending: isCompletePending,
    isConfirming: isCompleteConfirming,
    isSuccess: isCompleteSuccess,
    error: completeError,
  } = useConfirmCompletion();

  const {
    cancelOrder,
    hash: cancelHash,
    isPending: isCancelPending,
    isConfirming: isCancelConfirming,
    isSuccess: isCancelSuccess,
    error: cancelError,
  } = useCancelOrder();

  const normalizedAddress = address?.toLowerCase();
  const normalizedClient = client.toLowerCase();

  const isClient = normalizedAddress === normalizedClient;

  const canAccept =
    status === "Open" &&
    !!address &&
    !isClient;

  const canFund =
    status === "Accepted" &&
    !!address &&
    isClient;

  const canComplete =
    status === "Funded" &&
    !!address &&
    isClient;

  const canCancel =
    !!address &&
    isClient &&
    (status === "Open" ||
      status === "Accepted" ||
      status === "Funded");

  const isAccepting =
    isAcceptPending || isAcceptConfirming;

  const isFunding =
    isFundPending || isFundConfirming;

  const isCompleting =
    isCompletePending || isCompleteConfirming;

  const isCancelling =
    isCancelPending || isCancelConfirming;

  const isTransactionPending =
    isAccepting ||
    isFunding ||
    isCompleting ||
    isCancelling;

  const handleAccept = () => {
    acceptOrder(orderId);
  };

  const handleFund = () => {
    fundOrder({
      orderId,
      amount: parseEther(amount.toString()),
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

      <CardContent className="space-y-4">
        <Button
          className="w-full"
          disabled={!canAccept || isTransactionPending}
          onClick={handleAccept}
        >
          {isAccepting
            ? "Accepting Order..."
            : "Accept Order"}
        </Button>

        <Button
          className="w-full"
          disabled={!canFund || isTransactionPending}
          onClick={handleFund}
        >
          {isFunding
            ? "Funding Escrow..."
            : "Fund Escrow"}
        </Button>

        <Button
          className="w-full"
          disabled={!canComplete || isTransactionPending}
          onClick={handleComplete}
        >
          {isCompleting
            ? "Completing Order..."
            : "Complete Order"}
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          disabled={!canCancel || isTransactionPending}
          onClick={handleCancel}
        >
          {isCancelling
            ? "Cancelling Order..."
            : "Cancel Order"}
        </Button>

        <div className="space-y-2">
          <TransactionStatus
            hash={acceptHash}
            isPending={isAcceptPending}
            isConfirming={isAcceptConfirming}
            isSuccess={isAcceptSuccess}
            error={acceptError}
          />

          <TransactionStatus
            hash={fundHash}
            isPending={isFundPending}
            isConfirming={isFundConfirming}
            isSuccess={isFundSuccess}
            error={fundError}
          />

          <TransactionStatus
            hash={completeHash}
            isPending={isCompletePending}
            isConfirming={isCompleteConfirming}
            isSuccess={isCompleteSuccess}
            error={completeError}
          />

          <TransactionStatus
            hash={cancelHash}
            isPending={isCancelPending}
            isConfirming={isCancelConfirming}
            isSuccess={isCancelSuccess}
            error={cancelError}
          />
        </div>
      </CardContent>
    </Card>
  );
}