import { Badge } from '@/components/ui/badge'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
}

function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="space-y-4">
      <Badge variant="secondary">{eyebrow}</Badge>
      <div className="space-y-3">
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted">{description}</p>
      </div>
    </header>
  )
}

export { PageHeader }
