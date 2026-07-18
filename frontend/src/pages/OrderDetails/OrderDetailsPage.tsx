import { useParams } from "react-router";

import { Container } from "@/components/ui/Container";

export function OrderDetailsPage() {
  const { id } = useParams();

  return (
    <Container>
      <h1 className="text-4xl font-bold tracking-tight">
        Order #{id}
      </h1>
    </Container>
  );
}