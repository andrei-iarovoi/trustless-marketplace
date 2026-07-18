import { useParams } from "react-router";

import { Container } from "@/components/ui/Container";

export function OrderDetailsPage() {
  const { orderId } = useParams();

  return (
    <Container>
      <h1 className="text-4xl font-bold tracking-tight">
        Order #{orderId}
      </h1>
    </Container>
  );
}
