import { useMemo } from "react";

import { mockOrders } from "@/data/mockOrders";
import type { Order } from "@/types/order";

interface UseMarketplaceResult {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
}

export function useMarketplace(): UseMarketplaceResult {
  const orders = useMemo(() => mockOrders, []);

  return {
    orders,
    isLoading: false,
    error: null,
  };
}