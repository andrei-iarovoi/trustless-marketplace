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

export function useConfirmCompletion() {
  const { address } = useAccount();
  const { invalidateMarketplace } = useInvalidateMarketplace();

  const {
    data: hash,
    writeContractAsync,
    isPending,
    error,
    reset,
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
    label: "Complete order",
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

  const confirmCompletion = async (orderId: number) => {
    if (!address) {
      throw new Error("Wallet is not connected.");
    }

    return writeContractAsync({
      ...marketplaceConfig,
      functionName: "confirmCompletion",
      args: [BigInt(orderId)],
      account: address,
      chain: sepolia,
    });
  };

  return {
    confirmCompletion,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: transactionError,
    reset,
  };
}
