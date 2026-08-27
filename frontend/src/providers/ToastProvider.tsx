import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ToastViewport, type ToastItem } from "@/components/ui/toast";
import { ToastContext } from "@/providers/toast-context";

const DEFAULT_TOAST_DURATION_MS = 7000;

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    const durationMs = toast.durationMs ?? DEFAULT_TOAST_DURATION_MS;

    setToasts((currentToasts) => [
      ...currentToasts,
      {
        ...toast,
        id,
        durationMs,
      },
    ]);

    if (durationMs > 0) {
      window.setTimeout(() => {
        dismissToast(id);
      }, durationMs);
    }
  }, [dismissToast]);

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
