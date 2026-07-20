import { useMemo } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

import { marketplaceConfig } from "@/contracts";
import type { Order } from "@/types/order";

const STATUS: Order["status"][] = [
  "Open",
  "Accepted",
  "Funded",
  "Completed",
  "Cancelled",
];

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function useOrder(orderId?: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    ...marketplaceConfig,
    functionName: "orders",
    args: orderId ? [BigInt(orderId)] : undefined,
    query: {
      enabled: orderId !== undefined,
    },
  });

  const order = useMemo<Order | undefined>(() => {
    if (!data || orderId === undefined) return undefined;

    const [client, freelancer, description, amount, status] = data;

    return {
      id: orderId,
      description,
      amount: Number(formatEther(amount)),
      client,
      freelancer:
        freelancer.toLowerCase() === ZERO_ADDRESS
          ? undefined
          : freelancer,
      status: STATUS[Number(status)],
    };
  }, [data, orderId]);

  return {
    order,
    isLoading,
    error,
    refetch,
  };
}