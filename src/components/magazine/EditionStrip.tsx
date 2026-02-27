import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Edicao } from '@/sanity/lib/queries'

interface EditionStripProps {
  editions?: Edicao[]
}

export function EditionStrip({ editions = [] }: EditionStripProps) {
  // Most recent published edition is "active"
  const latestPublished = editions.find((e) => e.publicada)

  return (
    <div className="overflow-x-auto border-b border-pg-border bg-[#F5F5F5]">
      <div className="flex min-w-max items-center gap-2 px-10 py-2.5">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted">
          Edições
        </span>

        {editions.length > 0 ? (
          editions.map((ed) =>
            ed.publicada ? (
              <Link
                key={ed._id}
                href={`/edicoes/${ed.slug.current}`}
                className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 no-underline transition-colors ${
                  ed._id === latestPublished?._id
                    ? 'border-pg-red bg-pg-red text-white'
                    : 'border-pg-border bg-white text-pg-muted hover:border-pg-navy hover:text-pg-navy'
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.12em]">#{ed.numero}</span>
                <span className="font-body text-xs">
                  {format(new Date(ed.dataPublicacao), 'MMM yyyy', { locale: ptBR })}
                </span>
                {ed._id === latestPublished?._id && <span className="text-[10px]">★</span>}
              </Link>
            ) : (
              <div
                key={ed._id}
                className="flex cursor-not-allowed items-center gap-1.5 rounded-sm border border-pg-border bg-white px-3 py-1.5 opacity-50"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-pg-muted">#{ed.numero}</span>
                <span className="font-body text-xs text-pg-muted">Em breve</span>
              </div>
            )
          )
        ) : (
          // Fallback while CMS has no editions yet
          <span className="font-body text-xs text-pg-muted">Primeira edição em breve ★</span>
        )}
      </div>
    </div>
  )
}
