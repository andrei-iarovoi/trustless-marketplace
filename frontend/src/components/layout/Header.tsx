import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Container } from "@/components/ui/Container";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between">
        <Logo />

        <Navigation />

        <ConnectButton
          accountStatus="address"
          chainStatus="icon"
          showBalance={false}
        />
      </Container>
    </header>
  );
}