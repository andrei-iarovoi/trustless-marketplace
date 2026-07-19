import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface CreateOrderFormData {
  title: string;
  description: string;
  price: string;
  seller: string;
}

interface CreateOrderFormProps {
  onSubmit: (data: CreateOrderFormData) => void;
  onCancel?: () => void;
}

export function CreateOrderForm({
  onSubmit,
  onCancel,
}: CreateOrderFormProps) {
  const [form, setForm] = useState<CreateOrderFormData>({
    title: "",
    description: "",
    price: "",
    seller: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateOrderFormData, string>>
  >({});

  const updateField = (
    field: keyof CreateOrderFormData,
    value: string
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
    const nextErrors: Partial<Record<keyof CreateOrderFormData, string>> = {};

    if (!form.title.trim()) {
      nextErrors.title = "Project title is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    } else if (form.description.length < 20) {
      nextErrors.description =
        "Description should contain at least 20 characters.";
    }

    if (!form.price.trim()) {
      nextErrors.price = "Price is required.";
    } else if (Number(form.price) <= 0 || Number.isNaN(Number(form.price))) {
      nextErrors.price = "Price must be greater than 0.";
    }

    if (!form.seller.trim()) {
      nextErrors.seller = "Seller address is required.";
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(form.seller)) {
      nextErrors.seller = "Enter a valid Ethereum address.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    onSubmit(form);
  };

  const handleReset = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      seller: "",
    });

    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>

        <Input
          id="title"
          placeholder="Build NFT Marketplace"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          placeholder="Describe the project requirements..."
          rows={5}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Budget (ETH)</Label>

        <Input
          id="price"
          type="number"
          min="0"
          step="0.0001"
          placeholder="0.5"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
        />

        {errors.price && (
          <p className="text-sm text-destructive">{errors.price}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="seller">Seller Address</Label>

        <Input
          id="seller"
          placeholder="0x..."
          value={form.seller}
          onChange={(e) => updateField("seller", e.target.value)}
        />

        {errors.seller && (
          <p className="text-sm text-destructive">{errors.seller}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>

        <Button type="submit">Create Order</Button>
      </div>
    </form>
  );
}