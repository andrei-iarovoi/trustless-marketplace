import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateMarketplace() {
  const queryClient = useQueryClient();

  const invalidateMarketplace = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["readContract"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["readContracts"],
      }),
    ]);
  }, [queryClient]);

  return {
    invalidateMarketplace,
  };
}