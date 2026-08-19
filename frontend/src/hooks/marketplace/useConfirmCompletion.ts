import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import { marketplaceConfig } from "@/contracts";

export function useConfirmCompletion() {
  const { address } = useAccount();

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

  const confirmCompletion = (orderId: number) => {
    if (!address) {
      throw new Error("Wallet is not connected.");
    }

    writeContract({
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
    error: error ?? receiptError ?? null,
  };
}