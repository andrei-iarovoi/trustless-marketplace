import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/toast-context";

const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io/tx/";
const DEFAULT_SUCCESS_DISMISS_MS = 7000;

type TransactionStatusProps = {
  label: string;
  hash?: string;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error?: Error | null;
  autoDismissMs?: number;
};

function formatHash(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

function getExplorerUrl(hash: string) {
  return `${SEPOLIA_EXPLORER}${hash}`;
}

export function TransactionStatus({
  label,
  hash,
  isPending,
  isConfirming,
  isSuccess,
  error,
  autoDismissMs = DEFAULT_SUCCESS_DISMISS_MS,
}: TransactionStatusProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lastSuccessToastHashRef = useRef<string | null>(null);
  const lastErrorToastMessageRef = useRef<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isPending || isConfirming || isSuccess || error) {
      setIsVisible(true);
    }
  }, [error, hash, isConfirming, isPending, isSuccess]);

  useEffect(() => {
    if (!isSuccess || !hash || lastSuccessToastHashRef.current === hash) {
      return;
    }

    lastSuccessToastHashRef.current = hash;
    lastErrorToastMessageRef.current = null;

    showToast({
      title: `${label} confirmed`,
      description: `Transaction ${formatHash(hash)} was confirmed on Sepolia.`,
      variant: "success",
      durationMs: autoDismissMs,
      action: {
        label: `View ${formatHash(hash)} on Etherscan`,
        href: getExplorerUrl(hash),
      },
    });
  }, [autoDismissMs, hash, isSuccess, label, showToast]);

  useEffect(() => {
    if (!error || lastErrorToastMessageRef.current === error.message) {
      return;
    }

    lastErrorToastMessageRef.current = error.message;

    showToast({
      title: `${label} failed`,
      description: error.message,
      variant: "error",
      durationMs: autoDismissMs,
      action: hash
        ? {
            label: `View ${formatHash(hash)} on Etherscan`,
            href: getExplorerUrl(hash),
          }
        : undefined,
    });
  }, [autoDismissMs, error, hash, label, showToast]);

  useEffect(() => {
    if (!isSuccess || !isVisible || autoDismissMs <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, autoDismissMs);

    return () => window.clearTimeout(timeout);
  }, [autoDismissMs, isSuccess, isVisible]);

  if (!isVisible) {
    return null;
  }

  if (error) {
    return (
      <div
        aria-live="polite"
        className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
      >
        <div className="flex items-start gap-3">
          <XCircle className="mt-0.5 size-4 shrink-0 text-red-400" />

          <div className="min-w-0">
            <p className="text-sm font-medium text-red-400">
              {label} failed
            </p>

            <p className="mt-1 break-words text-xs leading-5 text-slate-500">
              {error.message}
            </p>

            {hash ? <TransactionLink hash={hash} /> : null}
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div
        aria-live="polite"
        className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
      >
        <div className="flex items-center gap-3">
          <Loader2 className="size-4 animate-spin text-cyan-300" />

          <div>
            <p className="text-sm font-medium text-cyan-300">
              {label}: confirm in wallet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Waiting for your wallet signature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div
        aria-live="polite"
        className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
      >
        <div className="flex items-start gap-3">
          <Loader2 className="mt-0.5 size-4 animate-spin text-cyan-300" />

          <div>
            <p className="text-sm font-medium text-cyan-300">
              {label}: confirming
            </p>

            {hash ? (
              <TransactionLink hash={hash} />
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                Waiting for transaction hash.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess && hash) {
    return (
      <div
        aria-live="polite"
        className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />

          <div>
            <p className="text-sm font-medium text-emerald-400">
              {label} confirmed
            </p>

            <TransactionLink hash={hash} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

type TransactionLinkProps = {
  hash: string;
};

function TransactionLink({ hash }: TransactionLinkProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="mt-1 h-auto px-0 text-xs text-slate-400 hover:bg-transparent hover:text-cyan-300"
    >
      <a
        href={getExplorerUrl(hash)}
        target="_blank"
        rel="noreferrer"
      >
        View {formatHash(hash)} on Etherscan
        <ExternalLink className="ml-1" size={13} />
      </a>
    </Button>
  );
}
