import { CheckCircle2, ExternalLink, Loader2, X, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: "success" | "error" | "pending";
  action?: {
    label: string;
    href: string;
  };
  durationMs?: number;
};

type ToastViewportProps = {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
};

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

type ToastCardProps = {
  toast: ToastItem;
  onDismiss: (id: string) => void;
};

function ToastCard({ toast, onDismiss }: ToastCardProps) {
  const isSuccess = toast.variant === "success";
  const isPending = toast.variant === "pending";
  const Icon = isSuccess ? CheckCircle2 : isPending ? Loader2 : XCircle;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-background/95 p-4 shadow-2xl shadow-black/30 backdrop-blur supports-[backdrop-filter]:bg-background/85",
        isSuccess && "border-emerald-500/25 shadow-emerald-950/20",
        isPending && "border-cyan-500/25 shadow-cyan-950/20",
        toast.variant === "error" && "border-red-500/25 shadow-red-950/20",
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn(
            "mt-0.5 size-4 shrink-0",
            isSuccess && "text-emerald-400",
            isPending && "animate-spin text-cyan-300",
            toast.variant === "error" && "text-red-400",
          )}
        />

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-medium",
              isSuccess && "text-emerald-300",
              isPending && "text-cyan-200",
              toast.variant === "error" && "text-red-300",
            )}
          >
            {toast.title}
          </p>

          {toast.description ? (
            <p className="mt-1 break-words text-xs leading-5 text-muted">
              {toast.description}
            </p>
          ) : null}

          {toast.action ? (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mt-2 h-auto px-0 text-xs text-slate-400 hover:bg-transparent hover:text-cyan-300"
            >
              <a href={toast.action.href} target="_blank" rel="noreferrer">
                {toast.action.label}
                <ExternalLink className="ml-1" size={13} />
              </a>
            </Button>
          ) : null}
        </div>

        <button
          type="button"
          aria-label="Dismiss notification"
          className="rounded-lg p-1 text-muted transition hover:bg-white/5 hover:text-foreground"
          onClick={() => onDismiss(toast.id)}
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
