import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDown, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <Button
              type="button"
              onClick={openConnectModal}
              className="hidden bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/30 hover:bg-cyan-300 sm:inline-flex"
            >
              <Wallet className="size-4" />
              Connect Wallet
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button
              type="button"
              variant="destructive"
              onClick={openChainModal}
              className="hidden sm:inline-flex"
            >
              Wrong network
            </Button>
          );
        }

        return (
          <Button
            type="button"
            variant="secondary"
            onClick={openAccountModal}
            className="hidden border-cyan-400/20 bg-slate-900/80 text-slate-100 shadow-lg shadow-cyan-950/10 hover:border-cyan-300/40 hover:bg-cyan-950/30 sm:inline-flex"
          >
            {chain.hasIcon && chain.iconUrl ? (
              <span
                className={cn(
                  "size-4 overflow-hidden rounded-full",
                  chain.iconBackground ? "bg-white" : "bg-cyan-400/10",
                )}
                style={{ background: chain.iconBackground }}
              >
                <img
                  alt={chain.name ?? "Network"}
                  className="size-4"
                  src={chain.iconUrl}
                />
              </span>
            ) : null}
            {account.displayName}
            <ChevronDown className="size-4 text-slate-400" />
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}
