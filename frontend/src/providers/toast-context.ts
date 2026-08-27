import { createContext, useContext } from "react";

import type { ToastItem } from "@/components/ui/toast";

type ToastInput = Omit<ToastItem, "id">;

export type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
  dismissToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
