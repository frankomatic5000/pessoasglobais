import Link from 'next/link'

const editions = [
  { number: 1, label: 'Fevereiro 2026', active: true, slug: 'edicao-1' },
  { number: 2, label: 'Março 2026', active: false, slug: 'edicao-2' },
  { number: 3, label: 'Em breve', active: false, slug: null },
]

export function EditionStrip() {
  return (
    <div className="overflow-x-auto border-b border-pg-border bg-[#F5F5F5]">
      <div className="flex min-w-max items-center gap-2 px-10 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted mr-2">
          Edições
        </span>
        {editions.map((ed) =>
          ed.slug ? (
            <Link
              key={ed.number}
              href={`/edicoes/${ed.slug}`}
              className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 no-underline transition-colors ${
                ed.active
                  ? 'border-pg-red bg-pg-red text-white'
                  : 'border-pg-border bg-white text-pg-muted hover:border-pg-navy hover:text-pg-navy'
              }`}
            >
              <span className="font-mono text-[10px] tracking-[0.12em]">#{ed.number}</span>
              <span className="font-body text-xs">{ed.label}</span>
              {ed.active && <span className="text-[10px]">★</span>}
            </Link>
          ) : (
            <div
              key={ed.number}
              className="flex cursor-not-allowed items-center gap-1.5 rounded-sm border border-pg-border bg-white px-3 py-1.5 opacity-50"
            >
              <span className="font-mono text-[10px] tracking-[0.12em] text-pg-muted">#{ed.number}</span>
              <span className="font-body text-xs text-pg-muted">{ed.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}
