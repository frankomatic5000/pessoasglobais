import Link from 'next/link'

interface ArticleCardProps {
  category: string
  title: string
  deck: string
  author: string
  edition: string
  href: string
  accentClass?: string
}

export function ArticleCard({
  category,
  title,
  deck,
  author,
  edition,
  href,
  accentClass = 'from-pg-navy-dark to-pg-navy',
}: ArticleCardProps) {
  return (
    <Link href={href} className="group block no-underline">
      <article className="overflow-hidden rounded-sm border border-pg-border bg-pg-surface transition-shadow hover:shadow-lg">

        {/* Image placeholder — replace with next/image when Sanity is wired */}
        <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${accentClass}`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
            <span className="font-display text-[7rem] font-black text-white leading-none select-none">
              {category[0]}
            </span>
          </div>
          {/* Category overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/90">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            {category}
          </p>
          <h3 className="mb-2 font-display text-[1.1rem] font-bold leading-[1.2] text-pg-navy transition-colors group-hover:text-pg-red">
            {title}
          </h3>
          <p className="mb-4 font-body text-[15px] leading-[1.6] text-pg-muted">
            {deck}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between border-t border-pg-border pt-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted">
              {author}
            </span>
            <span className="rounded-sm bg-pg-navy px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
              {edition}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
