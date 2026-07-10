import { Search } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/pages/PageHeader'

function MarketplacePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Marketplace"
        title="Browse open escrow orders."
        description="Search and filter orders before connecting wallet actions to the deployed Sepolia contract."
      />

      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search by title, address, or status" />
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {['Open', 'Accepted', 'Funded', 'Completed'].map((status) => (
          <Card key={status}>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>Sample marketplace order</CardTitle>
                <Badge>{status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted">
              Order cards will render contract data through hooks and services.
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

export { MarketplacePage }
