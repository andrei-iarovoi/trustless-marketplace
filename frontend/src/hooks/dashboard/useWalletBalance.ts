import { useBalance, useAccount } from "wagmi";

export function useWalletBalance() {
  const { address, isConnected } = useAccount();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useBalance({
    address,
    query: {
      enabled: isConnected && !!address,
    },
  });

  return {
    address,
    balance: data?.formatted ?? "0",
    symbol: data?.symbol ?? "ETH",
    isLoading,
    error,
    refetch,
  };
}