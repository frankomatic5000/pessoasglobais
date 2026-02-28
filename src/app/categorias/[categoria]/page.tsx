import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  categoryArticlesQuery,
  allCategoriasQuery,
  categoriaBySlugQuery,
  type ArticleStub,
  type Categoria,
} from '@/sanity/lib/queries'
import { ArticleCard } from '@/components/magazine/ArticleCard'

type PageProps = { params: Promise<{ categoria: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const cats = await client.fetch<Categoria[]>(allCategoriasQuery)
  return cats.map((c) => ({ categoria: c.slug.current }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria: slug } = await params
  const cat = await client.fetch<Categoria | null>(categoriaBySlugQuery, { slug })
  if (!cat) return { title: 'Categoria não encontrada' }
  return {
    title: `${cat.nome} — Pessoas Globais`,
    description: cat.descricao ?? `Matérias sobre ${cat.nome} na revista Pessoas Globais.`,
  }
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria: slug } = await params

  const [cat, articles, allCats] = await Promise.all([
    client.fetch<Categoria | null>(categoriaBySlugQuery, { slug }),
    client.fetch<ArticleStub[]>(categoryArticlesQuery, { categoria: slug }),
    client.fetch<Categoria[]>(allCategoriasQuery),
  ])

  if (!cat) notFound()

  const others = allCats.filter((c) => c.slug.current !== slug)

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Header */}
      <header className="bg-pg-navy px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Categoria
          </p>
          <h1 className="mb-3 font-display text-[2.5rem] font-black leading-[1.05] text-white">
            {cat.nome}
          </h1>
          {cat.descricao && (
            <p className="font-body text-[17px] leading-[1.65] text-white/70">
              {cat.descricao}
            </p>
          )}
        </div>
      </header>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        {articles.length === 0 ? (
          <p className="font-body text-pg-muted">Nenhuma matéria publicada nesta categoria ainda.</p>
        ) : (
          <>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted">
              {articles.length} matéria{articles.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard
                  key={a._id}
                  category={a.categoria?.nome ?? ''}
                  title={a.titulo}
                  deck={a.linhaFina}
                  author={`por ${a.autor}`}
                  edition={`Ed. #${a.edicao.numero}`}
                  href={`/edicoes/${a.edicao.slug.current}/${a.slug.current}`}
                  imageSrc={a.imagemCapa ? urlFor(a.imagemCapa).width(800).quality(80).url() : undefined}
                  imageAlt={a.titulo}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Other categories */}
      {others.length > 0 && (
        <section className="border-t border-pg-border px-5 py-10">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted">
              Outras categorias
            </p>
            <div className="flex flex-wrap gap-2">
              {others.map((c) => (
                <Link
                  key={c.slug.current}
                  href={`/categorias/${c.slug.current}`}
                  className="rounded-sm border border-pg-border bg-pg-tag px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted no-underline transition-colors hover:border-pg-red hover:bg-pg-red hover:text-white"
                >
                  {c.nome}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
