import { useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import { marketplaceConfig } from "@/contracts";
import { useInvalidateMarketplace } from "./useInvalidateMarketplace";

type CreateOrderParams = {
  description: string;
  amount: bigint;
};

export function useCreateOrder() {
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

  const createOrder = ({
    description,
    amount,
  }: CreateOrderParams) => {
    if (!address) {
      throw new Error("Wallet is not connected.");
    }

    writeContract({
      ...marketplaceConfig,
      functionName: "createOrder",
      args: [description, amount],
      account: address,
      chain: sepolia,
    });
  };

  return {
    createOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: error ?? receiptError ?? null,
  };
}