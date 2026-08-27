import { Container } from "@/components/ui/Container";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <Container className="relative flex h-18 items-center justify-between">
        <div className="z-10">
          <Logo />
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <Navigation />
        </div>

        <div className="z-10 flex justify-end">
          <WalletConnectButton />
        </div>
      </Container>
    </header>
  );
}
