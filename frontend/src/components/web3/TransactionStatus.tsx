import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

type TransactionStatusProps = {
  hash?: string;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error?: Error | null;
};

const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io/tx/";

export function TransactionStatus({
  hash,
  isPending,
  isConfirming,
  isSuccess,
  error,
}: TransactionStatusProps) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-sm font-medium text-red-400">
          Transaction failed
        </p>

        <p className="mt-1 break-words text-xs text-slate-500">
          {error.message}
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-sm font-medium text-cyan-300">
          Confirm transaction in your wallet...
        </p>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-sm font-medium text-cyan-300">
          Transaction pending...
        </p>

        {hash && (
          <a
            href={`${SEPOLIA_EXPLORER}${hash}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 transition hover:text-cyan-300"
          >
            View transaction
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    );
  }

  if (isSuccess && hash) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="text-sm font-medium text-emerald-400">
          Transaction confirmed
        </p>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mt-1 h-auto px-0 text-xs text-slate-400 hover:bg-transparent hover:text-cyan-300"
        >
          <a
            href={`${SEPOLIA_EXPLORER}${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
            <ExternalLink className="ml-1" size={13} />
          </a>
        </Button>
      </div>
    );
  }

  return null;
}