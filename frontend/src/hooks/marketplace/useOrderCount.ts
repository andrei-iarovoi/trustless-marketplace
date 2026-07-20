import { useReadContract } from "wagmi";

import { marketplaceConfig } from "@/contracts";

export function useOrderCount() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    ...marketplaceConfig,
    functionName: "orderCounter",
  });

  return {
    orderCount: Number(data ?? 0n),
    isLoading,
    error,
    refetch,
  };
}