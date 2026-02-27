import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { allEditionsQuery, type Edicao } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Edições — Pessoas Globais',
  description: 'Todas as edições da revista Pessoas Globais.',
}

export default async function EdicoesPage() {
  const editions = await client.fetch<Edicao[]>(allEditionsQuery)

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Header */}
      <header className="bg-pg-navy px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Arquivo
          </p>
          <h1 className="font-display text-[2.5rem] font-black leading-[1.05] text-white">
            Todas as edições
          </h1>
        </div>
      </header>

      {/* Editions grid */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        {editions.length === 0 ? (
          <p className="font-body text-pg-muted">Nenhuma edição publicada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editions.map((ed) => (
              <div
                key={ed._id}
                className={`overflow-hidden rounded-sm border border-pg-border bg-pg-surface ${!ed.publicada ? 'opacity-60' : ''}`}
              >
                {/* Cover image or color bar */}
                {ed.imagemCapa ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlFor(ed.imagemCapa).width(640).quality(80).url()}
                      alt={ed.tema}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`h-2 w-full ${ed.publicada ? 'bg-pg-red' : 'bg-pg-border'}`} />
                )}

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <span className={`inline-block rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white ${ed.publicada ? 'bg-pg-red' : 'bg-pg-muted'}`}>
                      #{ed.numero}
                    </span>
                    {ed.publicada && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-red">
                        Publicada ★
                      </span>
                    )}
                  </div>

                  <h2 className="mb-1 font-display text-[1.25rem] font-bold text-pg-navy">
                    {ed.tema}
                  </h2>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted">
                    {format(new Date(ed.dataPublicacao), "MMMM yyyy", { locale: ptBR })}
                  </p>

                  {ed.editorial && (
                    <p className="mb-5 font-body text-[14px] leading-[1.6] text-pg-muted line-clamp-3">
                      {ed.editorial}
                    </p>
                  )}

                  {ed.articleCount !== undefined && (
                    <p className="mb-4 font-mono text-[10px] text-pg-muted">
                      {ed.articleCount} matéria{ed.articleCount !== 1 ? 's' : ''}
                    </p>
                  )}

                  {ed.publicada ? (
                    <Link
                      href={`/edicoes/${ed.slug.current}`}
                      className="inline-block rounded-sm bg-pg-red px-5 py-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
                    >
                      Ver edição →
                    </Link>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted">
                      Em breve
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
