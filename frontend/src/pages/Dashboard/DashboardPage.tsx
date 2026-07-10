import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/pages/PageHeader'

const stats = ['Total Orders', 'Open Orders', 'Locked ETH', 'Platform Fees', 'Completion Rate']

function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Marketplace health at a glance."
        description="High-level protocol metrics will be derived from contract reads and indexed event data."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat}>
            <CardHeader>
              <CardTitle className="text-sm text-muted">{stat}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-foreground">--</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

export { DashboardPage }
