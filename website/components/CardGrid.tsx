import type { Item } from '@/lib/content'

export function Card({ item, light = false }: { item: Item; light?: boolean }) {
  const cls = ['tool', light ? 'light' : '', item.accent ? 'accent' : ''].filter(Boolean).join(' ')
  return (
    <div className={cls}>
      <div className="fn">{item.name}</div>
      <p>{item.blurb}</p>
    </div>
  )
}

export default function CardGrid({ items, light = false }: { items: Item[]; light?: boolean }) {
  return (
    <div className="tools-grid">
      {items.map((item) => (
        <Card key={item.name} item={item} light={light} />
      ))}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: React.ReactNode
  lede: string
}) {
  return (
    <header className="pagehead">
      <div className="container">
        <span className="eyebrow">
          <span className="pulse" />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </header>
  )
}
