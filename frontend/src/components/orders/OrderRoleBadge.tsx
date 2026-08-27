import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types/order";

type OrderRoleBadgeProps = {
  order: Order;
  address?: string;
};

export function OrderRoleBadge({ order, address }: OrderRoleBadgeProps) {
  if (!address) {
    return <Badge variant="secondary">Viewer</Badge>;
  }

  const normalizedAddress = address.toLowerCase();

  if (order.client.toLowerCase() === normalizedAddress) {
    return <Badge variant="default">You are client</Badge>;
  }

  if (order.freelancer?.toLowerCase() === normalizedAddress) {
    return <Badge variant="success">You are freelancer</Badge>;
  }

  return <Badge variant="outline">Marketplace participant</Badge>;
}
