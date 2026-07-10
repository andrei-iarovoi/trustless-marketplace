import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/pages/PageHeader'

function MyOrdersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="My Orders"
        title="Track orders connected to your wallet."
        description="Created, accepted, funded, and completed orders will be grouped here once wallet state is connected."
      />

      <section className="grid gap-4 md:grid-cols-2">
        {['Created by me', 'Accepted by me'].map((group) => (
          <Card key={group}>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{group}</CardTitle>
                <Badge variant="secondary">0</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted">
              Wallet-specific order lists will render here.
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

export { MyOrdersPage }
