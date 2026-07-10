import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <Card className="w-full max-w-3xl bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge>Sepolia</Badge>
            <Badge variant="secondary">Escrow</Badge>
          </div>
          <CardTitle className="text-4xl text-foreground sm:text-5xl">Trustless Marketplace</CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7">
            A production-minded Web3 marketplace interface for creating, funding, and completing
            escrow orders without relying on a trusted intermediary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search orders by title, address, or status" />
        </CardContent>
        <CardFooter className="gap-3">
          <Button>Launch app</Button>
          <Button variant="secondary">View marketplace</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default App
