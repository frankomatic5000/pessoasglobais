import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { categoryArticlesQuery, type ArticleStub } from '@/sanity/lib/queries'
import { ArticleCard } from '@/components/magazine/ArticleCard'

type PageProps = { params: Promise<{ categoria: string }> }

export const revalidate = 60

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  lideranca:  { name: 'Liderança',   description: 'Perfis de líderes que estão redefinindo o que significa liderar em escala global.' },
  negocios:   { name: 'Negócios',    description: 'Estratégias, modelos e casos de negócios que cruzam fronteiras e culturas.' },
  cultura:    { name: 'Cultura',     description: 'A interseção entre identidade cultural e empreendedorismo criativo.' },
  diaspora:   { name: 'Diáspora',    description: 'Histórias de brasileiros e multiculturais que constroem impacto além-fronteiras.' },
  tecnologia: { name: 'Tecnologia',  description: 'Inovação tecnológica com raízes culturais profundas.' },
}

const OTHER_CATEGORIES = Object.entries(CATEGORY_META).map(([slug, m]) => ({ slug, name: m.name }))

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((categoria) => ({ categoria }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params
  const meta = CATEGORY_META[categoria]
  if (!meta) return { title: 'Categoria não encontrada' }
  return {
    title: `${meta.name} — Pessoas Globais`,
    description: meta.description,
  }
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  const meta = CATEGORY_META[categoria]
  if (!meta) notFound()

  const articles = await client.fetch<ArticleStub[]>(categoryArticlesQuery, {
    categoria,
  })

  const others = OTHER_CATEGORIES.filter((c) => c.slug !== categoria)

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Header */}
      <header className="bg-pg-navy px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Categoria
          </p>
          <h1 className="mb-3 font-display text-[2.5rem] font-black leading-[1.05] text-white">
            {meta.name}
          </h1>
          <p className="font-body text-[17px] leading-[1.65] text-white/70">
            {meta.description}
          </p>
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
      <section className="border-t border-pg-border px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted">
            Outras categorias
          </p>
          <div className="flex flex-wrap gap-2">
            {others.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="rounded-sm border border-pg-border bg-pg-tag px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted no-underline transition-colors hover:border-pg-red hover:bg-pg-red hover:text-white"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
