import { useEffect, useRef } from "react";

import { useToast } from "@/providers/toast-context";

const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io/tx/";
const DEFAULT_TOAST_DURATION_MS = 7000;

type TransactionToastParams = {
  label: string;
  hash?: string;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error?: Error | null;
  durationMs?: number;
};

function formatHash(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

function getExplorerUrl(hash: string) {
  return `${SEPOLIA_EXPLORER}${hash}`;
}

function getTransactionErrorMessage(error: Error) {
  const message = error.message;
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("user rejected")) {
    return "Transaction was rejected in the wallet.";
  }

  if (normalizedMessage.includes("insufficient funds")) {
    return "Insufficient funds for this transaction.";
  }

  if (message.length > 180) {
    return `${message.slice(0, 177)}...`;
  }

  return message;
}

export function useTransactionToast({
  label,
  hash,
  isPending,
  isConfirming,
  isSuccess,
  error,
  durationMs = DEFAULT_TOAST_DURATION_MS,
}: TransactionToastParams) {
  const { showToast } = useToast();
  const hasShownPendingToastRef = useRef(false);
  const lastSubmittedToastHashRef = useRef<string | null>(null);
  const lastSuccessToastHashRef = useRef<string | null>(null);
  const lastErrorToastMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isPending || hasShownPendingToastRef.current) {
      return;
    }

    hasShownPendingToastRef.current = true;
    lastErrorToastMessageRef.current = null;

    showToast({
      title: `${label}: confirm in wallet`,
      description: "Review and sign the transaction in your wallet.",
      variant: "pending",
      durationMs,
    });
  }, [durationMs, isPending, label, showToast]);

  useEffect(() => {
    if (!hash || !isConfirming || lastSubmittedToastHashRef.current === hash) {
      return;
    }

    lastSubmittedToastHashRef.current = hash;

    showToast({
      title: `${label}: transaction submitted`,
      description: `Transaction ${formatHash(hash)} is being processed on Sepolia.`,
      variant: "pending",
      durationMs,
      action: {
        label: `View ${formatHash(hash)} on Etherscan`,
        href: getExplorerUrl(hash),
      },
    });
  }, [durationMs, hash, isConfirming, label, showToast]);

  useEffect(() => {
    if (!isSuccess || !hash || lastSuccessToastHashRef.current === hash) {
      return;
    }

    lastSuccessToastHashRef.current = hash;
    hasShownPendingToastRef.current = false;
    lastErrorToastMessageRef.current = null;

    showToast({
      title: `${label}: confirmed`,
      description: `Transaction ${formatHash(hash)} was confirmed on Sepolia.`,
      variant: "success",
      durationMs,
      action: {
        label: `View ${formatHash(hash)} on Etherscan`,
        href: getExplorerUrl(hash),
      },
    });
  }, [durationMs, hash, isSuccess, label, showToast]);

  useEffect(() => {
    if (!error || lastErrorToastMessageRef.current === error.message) {
      return;
    }

    lastErrorToastMessageRef.current = error.message;
    hasShownPendingToastRef.current = false;

    showToast({
      title: `${label}: failed`,
      description: getTransactionErrorMessage(error),
      variant: "error",
      durationMs,
      action: hash
        ? {
            label: `View ${formatHash(hash)} on Etherscan`,
            href: getExplorerUrl(hash),
          }
        : undefined,
    });
  }, [durationMs, error, hash, label, showToast]);
}
