import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface CreateOrderFormData {
  description: string;
  amount: string;
}

interface CreateOrderFormProps {
  onSubmit: (data: CreateOrderFormData) => void;
  onCancel?: () => void;
  isPending?: boolean;
}

export function CreateOrderForm({
  onSubmit,
  onCancel,
  isPending = false,
}: CreateOrderFormProps) {
  const [form, setForm] = useState<CreateOrderFormData>({
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateOrderFormData, string>>
  >({});

  const updateField = (
    field: keyof CreateOrderFormData,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: Partial<
      Record<keyof CreateOrderFormData, string>
    > = {};

    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    } else if (form.description.trim().length < 20) {
      nextErrors.description =
        "Description should contain at least 20 characters.";
    }

    if (!form.amount.trim()) {
      nextErrors.amount = "Amount is required.";
    } else {
      const amount = Number(form.amount);

      if (Number.isNaN(amount) || amount <= 0) {
        nextErrors.amount = "Amount must be greater than 0.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate() || isPending) {
      return;
    }

    onSubmit({
      description: form.description.trim(),
      amount: form.amount,
    });
  };

  const handleReset = () => {
    setForm({
      description: "",
      amount: "",
    });

    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          placeholder="Describe the project requirements..."
          rows={6}
          value={form.description}
          disabled={isPending}
          onChange={(event) =>
            updateField("description", event.target.value)
          }
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Budget (ETH)</Label>

        <Input
          id="amount"
          type="number"
          min="0"
          step="0.0001"
          placeholder="0.5"
          value={form.amount}
          disabled={isPending}
          onChange={(event) =>
            updateField("amount", event.target.value)
          }
        />

        {errors.amount && (
          <p className="text-sm text-destructive">
            {errors.amount}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={handleReset}
        >
          Reset
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
}