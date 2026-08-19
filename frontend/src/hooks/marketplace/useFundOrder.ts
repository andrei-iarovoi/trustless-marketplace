import { useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import { marketplaceConfig } from "@/contracts";
import { useInvalidateMarketplace } from "./useInvalidateMarketplace";

type FundOrderParams = {
  orderId: number;
  amount: bigint;
};

export function useFundOrder() {
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

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    void invalidateMarketplace();
  }, [isSuccess, invalidateMarketplace]);

  const fundOrder = ({
    orderId,
    amount,
  }: FundOrderParams) => {
    if (!address) {
      throw new Error("Wallet is not connected.");
    }

    writeContract({
      ...marketplaceConfig,
      functionName: "fundOrder",
      args: [BigInt(orderId)],
      value: amount,
      account: address,
      chain: sepolia,
    });
  };

  return {
    fundOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: error ?? receiptError ?? null,
  };
}