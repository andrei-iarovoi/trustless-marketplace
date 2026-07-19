import { useState } from "react";
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

export function CreateOrderDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: CreateOrderFormData) => {
    console.log("Create Order:", data);

    // Здесь позже будет writeContract()

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Order</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>

          <DialogDescription>
            Fill in the project details to publish a new escrow order.
          </DialogDescription>
        </DialogHeader>

        <CreateOrderForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}