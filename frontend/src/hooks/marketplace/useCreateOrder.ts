import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import { marketplaceConfig } from "@/contracts";

type CreateOrderParams = {
  description: string;
  amount: bigint;
};

export function useCreateOrder() {
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

  const createOrder = ({
    description,
    amount,
  }: CreateOrderParams) => {
    if (!address) {
      throw new Error("Wallet is not connected.");
    }

    writeContract({
      address: marketplaceConfig.address,
      abi: marketplaceConfig.abi,
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