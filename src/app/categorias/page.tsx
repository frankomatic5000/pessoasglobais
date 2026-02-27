import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allCategoriasQuery, type Categoria } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Categorias — Pessoas Globais',
  description: 'Explore as categorias da revista Pessoas Globais.',
}

export default async function CategoriasPage() {
  const categories = await client.fetch<Categoria[]>(allCategoriasQuery)

  return (
    <main className="min-h-screen bg-pg-paper">
      <header className="bg-pg-navy px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Navegue por tema
          </p>
          <h1 className="font-display text-[2.5rem] font-black leading-[1.05] text-white">
            Categorias
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        {categories.length === 0 ? (
          <p className="font-body text-pg-muted">Nenhuma categoria cadastrada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug.current}
                href={`/categorias/${cat.slug.current}`}
                className="group block rounded-sm border border-pg-border bg-pg-surface p-6 no-underline transition-all hover:-translate-y-1 hover:border-pg-red hover:shadow-lg"
              >
                <span className="mb-3 inline-block rounded-sm bg-pg-red px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                  {cat.nome}
                </span>
                {cat.descricao && (
                  <p className="font-body text-sm leading-relaxed text-pg-muted">
                    {cat.descricao}
                  </p>
                )}
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-pg-red opacity-0 transition-opacity group-hover:opacity-100">
                  Ver matérias →
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
