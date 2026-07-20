import { trustlessMarketplaceAbi } from "@/contracts/abi/trustlessMarketplace";

export const marketplaceConfig = {
  address: "0x772857301abC99E453918f2A6112C8D6d3615702" as const,
  abi: trustlessMarketplaceAbi,
} as const;