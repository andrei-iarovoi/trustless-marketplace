import { useParams } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/pages/PageHeader'

function OrderDetailsPage() {
  const { orderId } = useParams()

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={`Order ${orderId ?? 'details'}`}
        title="Escrow order details."
        description="Timeline, participants, budget, deadline, and available contract actions will live here."
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Timeline</CardTitle>
              <Badge variant="warning">Funded</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted">
            Open / Accepted / Funded / Completed.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button>Confirm completion</Button>
            <Button variant="secondary">Cancel order</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export { OrderDetailsPage }
