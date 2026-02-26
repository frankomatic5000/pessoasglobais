import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  edicaoQuery,
  allEditionSlugsQuery,
  type EdicaoPage,
  type ArticleStub,
} from '@/sanity/lib/queries'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { CTABanner } from '@/components/magazine/CTABanner'
import { NewsletterSignup } from '@/components/magazine/NewsletterSignup'

type PageProps = { params: Promise<{ edicao: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allEditionSlugsQuery)
  return slugs.map((s) => ({ edicao: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { edicao: slug } = await params
  const ed = await client.fetch<EdicaoPage | null>(edicaoQuery, { slug })
  if (!ed) return { title: 'Edição não encontrada' }
  return {
    title: `Edição #${ed.numero} — ${ed.tema} | Pessoas Globais`,
    description: ed.editorial ?? `Edição ${ed.numero} da revista Pessoas Globais.`,
  }
}

function toCardProps(a: ArticleStub) {
  return {
    category: a.categoria,
    title: a.titulo,
    deck: a.linhaFina,
    author: `por ${a.autor}`,
    edition: `Ed. #${a.edicao.numero}`,
    href: `/edicoes/${a.edicao.slug.current}/${a.slug.current}`,
    imageSrc: a.imagemCapa ? urlFor(a.imagemCapa).width(800).quality(80).url() : undefined,
    imageAlt: a.titulo,
  }
}

export default async function EdicaoPage({ params }: PageProps) {
  const { edicao: slug } = await params
  const ed = await client.fetch<EdicaoPage | null>(edicaoQuery, { slug })

  if (!ed) notFound()

  const dateLabel = format(new Date(ed.dataPublicacao), "MMMM yyyy", { locale: ptBR })

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Edition header */}
      <header className="bg-pg-navy px-5 py-16">
        <div className="mx-auto max-w-[780px]">
          <span className="mb-6 inline-block rounded-sm bg-pg-red px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
            Edição #{ed.numero} · {dateLabel}
          </span>
          <h1 className="mb-4 font-display text-[2.5rem] font-black leading-[1.05] text-white md:text-[3rem]">
            {ed.tema}
          </h1>
          {ed.editorial && (
            <p className="font-body text-[17px] italic leading-[1.65] text-white/70">
              {ed.editorial}
            </p>
          )}
        </div>
      </header>

      {/* Cover story */}
      {ed.featuredArticle && (
        <section className="mx-auto max-w-7xl px-5 py-12">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Matéria de capa
          </p>
          <div className="lg:max-w-[680px]">
            <ArticleCard {...toCardProps(ed.featuredArticle)} />
          </div>
        </section>
      )}

      {/* Divider */}
      {ed.articles.length > 0 && (
        <div className="mx-auto max-w-7xl px-5">
          <div className="border-t-2 border-pg-red" />
        </div>
      )}

      {/* Articles grid */}
      {ed.articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
            Todas as matérias desta edição
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ed.articles.map((a) => (
              <ArticleCard key={a._id} {...toCardProps(a)} />
            ))}
          </div>
        </section>
      )}

      {/* Edition navigation */}
      <nav className="border-t border-pg-border px-5 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {ed.prevEdition ? (
            <Link href={`/edicoes/${ed.prevEdition.slug.current}`} className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red">
              ← Edição anterior
            </Link>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-border">← Edição anterior</span>
          )}
          <Link href="/edicoes" className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red">
            Ver todas
          </Link>
          {ed.nextEdition ? (
            <Link href={`/edicoes/${ed.nextEdition.slug.current}`} className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red">
              Próxima edição →
            </Link>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-border">Próxima edição →</span>
          )}
        </div>
      </nav>

      <NewsletterSignup />
      <CTABanner />
    </main>
  )
}
