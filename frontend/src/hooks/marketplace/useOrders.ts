import { useMemo } from "react";
import { formatEther } from "viem";
import { useReadContracts } from "wagmi";

import { marketplaceConfig } from "@/contracts";
import type { Order } from "@/types/order";
import { useOrderCount } from "./useOrderCount";

const STATUS: Order["status"][] = [
  "Open",
  "Accepted",
  "Funded",
  "Completed",
  "Cancelled",
];

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function useOrders() {
  const { orderCount, isLoading: isCountLoading } = useOrderCount();

  const contracts = useMemo(
    () =>
      Array.from({ length: orderCount }, (_, index) => ({
        ...marketplaceConfig,
        functionName: "orders" as const,
        args: [BigInt(index + 1)],
      })),
    [orderCount]
  );

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useReadContracts({
    contracts,
    allowFailure: false,
  });

  const orders = useMemo<Order[]>(() => {
    if (!data) return [];

    return data.map((order, index) => {
      const [client, freelancer, description, amount, status] = order;

      return {
        id: index + 1,
        description,
        amount: Number(formatEther(amount)),
        client,
        freelancer:
          freelancer.toLowerCase() === ZERO_ADDRESS
            ? undefined
            : freelancer,
        status: STATUS[Number(status)],
      };
    });
  }, [data]);

  return {
    orders,
    isLoading: isLoading || isCountLoading,
    error,
    refetch,
  };
}