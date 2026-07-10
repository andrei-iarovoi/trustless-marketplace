import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/pages/PageHeader'

function LandingPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
        <PageHeader
          eyebrow="Trustless Marketplace"
          title="Escrow orders for serious Web3 work."
          description="Create, accept, fund, and complete marketplace orders through a Sepolia smart contract with a clear production-grade interface."
        />
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button asChild size="lg">
            <Link to="/marketplace">Launch app</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/dashboard">View dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Create order', 'Fund escrow', 'Confirm completion'].map((step) => (
          <Card key={step}>
            <CardHeader>
              <CardTitle>{step}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted">
              Placeholder for the landing page flow section.
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

export { LandingPage }
