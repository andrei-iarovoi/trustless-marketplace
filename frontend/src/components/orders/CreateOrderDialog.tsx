import { useEffect, useState } from "react";
import { parseEther } from "viem";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CreateOrderForm,
  type CreateOrderFormData,
} from "./CreateOrderForm";
import { useCreateOrder } from "@/hooks/marketplace";

export function CreateOrderDialog() {
  const [open, setOpen] = useState(false);

  const {
    createOrder,
    isPending,
    isConfirming,
    isSuccess,
    error,
  } = useCreateOrder();

  useEffect(() => {
    if (isSuccess && open) {
      setOpen(false);
    }
  }, [isSuccess, open]);

  const handleSubmit = (data: CreateOrderFormData) => {
    createOrder({
      description: data.description,
      amount: parseEther(data.amount),
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending || isConfirming) {
      return;
    }

    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create Order</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>

          <DialogDescription>
            Create a new escrow order on Sepolia. Your connected
            wallet will become the client.
          </DialogDescription>
        </DialogHeader>

        <CreateOrderForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending || isConfirming}
        />

        {error && (
          <p className="text-sm text-destructive">
            {error.message}
          </p>
        )}

        {isConfirming && (
          <p className="text-sm text-slate-400">
            Waiting for transaction confirmation...
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}