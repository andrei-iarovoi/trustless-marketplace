import type { ReactNode } from "react";

import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/config/wagmi";
import { ToastProvider } from "@/providers/ToastProvider";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const rainbowKitTheme = darkTheme({
  accentColor: "#22d3ee",
  accentColorForeground: "#042f3a",
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "small",
});

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{ appName: "Trustless Marketplace" }}
          locale="en-US"
          modalSize="compact"
          theme={rainbowKitTheme}
        >
          <ToastProvider>{children}</ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
