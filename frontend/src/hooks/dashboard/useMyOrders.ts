import { useMemo } from "react";
import { useAccount } from "wagmi";

import { useOrders } from "@/hooks/marketplace";

export function useMyOrders() {
  const { address } = useAccount();
  const { orders, isLoading, error, refetch } = useOrders();

  const myOrders = useMemo(() => {
    if (!address) {
      return [];
    }

    const normalizedAddress = address.toLowerCase();

    return orders.filter((order) => {
      const isClient =
        order.client.toLowerCase() === normalizedAddress;

      const isFreelancer =
        order.freelancer?.toLowerCase() === normalizedAddress;

      return isClient || isFreelancer;
    });
  }, [orders, address]);

  return {
    orders: myOrders,
    isLoading,
    error,
    refetch,
  };
}