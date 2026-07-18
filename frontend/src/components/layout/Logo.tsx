import { ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
        <ShieldCheck className="h-5 w-5 text-cyan-400" />
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-slate-400">
          Web3 Escrow
        </span>

        <span className="text-lg font-semibold tracking-tight text-white">
          Trustless Marketplace
        </span>
      </div>
    </Link>
  );
}