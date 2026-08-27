import { useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import { marketplaceConfig } from "@/contracts";
import { useTransactionToast } from "@/hooks/web3/useTransactionToast";
import { useInvalidateMarketplace } from "./useInvalidateMarketplace";

export function useCancelOrder() {
  const { address } = useAccount();
  const { invalidateMarketplace } = useInvalidateMarketplace();

  const {
    data: hash,
    writeContract,
    isPending,
    error,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const transactionError = error ?? receiptError ?? null;

  useTransactionToast({
    label: "Cancel order",
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: transactionError,
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    void invalidateMarketplace();
  }, [isSuccess, invalidateMarketplace]);

  const cancelOrder = (orderId: number) => {
    if (!address) {
      throw new Error("Wallet is not connected.");
    }

    writeContract({
      ...marketplaceConfig,
      functionName: "cancelOrder",
      args: [BigInt(orderId)],
      account: address,
      chain: sepolia,
    });
  };

  return {
    cancelOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: transactionError,
  };
}
