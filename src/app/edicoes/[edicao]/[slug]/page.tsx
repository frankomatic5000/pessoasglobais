import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  articleQuery,
  allArticleSlugsQuery,
  relatedArticlesQuery,
  type Article,
  type ArticleStub,
} from '@/sanity/lib/queries'
import { articleBodyComponents } from '@/sanity/lib/portabletext'
import { EditionBadge } from '@/components/magazine/EditionBadge'
import { MiniBio } from '@/components/magazine/MiniBio'
import { PullQuote } from '@/components/magazine/PullQuote'
import { ShareButtons } from '@/components/magazine/ShareButtons'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { CTABanner } from '@/components/magazine/CTABanner'
import { NewsletterSignup } from '@/components/magazine/NewsletterSignup'

type PageProps = { params: Promise<{ edicao: string; slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const items = await client.fetch<{ slug: string; edicao: string }[]>(allArticleSlugsQuery)
  return items.filter((i) => i.slug && i.edicao)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { edicao, slug } = await params
  const article = await client.fetch<Article | null>(articleQuery, { edicao, slug })
  if (!article) return { title: 'Matéria não encontrada' }
  return {
    title: article.seoTitle ?? `${article.titulo} | Pessoas Globais`,
    description: article.seoDescription ?? article.linhaFina,
    openGraph: {
      title: article.seoTitle ?? article.titulo,
      description: article.seoDescription ?? article.linhaFina,
      images: article.imagemCapa
        ? [{ url: urlFor(article.imagemCapa).width(1200).height(630).quality(80).url() }]
        : [],
    },
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

export default async function ArticlePage({ params }: PageProps) {
  const { edicao, slug } = await params

  const [article, related] = await Promise.all([
    client.fetch<Article | null>(articleQuery, { edicao, slug }),
    client.fetch<ArticleStub[]>(relatedArticlesQuery, { categoria: '', slug }).catch(() => []),
  ])

  if (!article) notFound()

  // Re-fetch related with correct category now that we have the article
  const relatedArticles = await client.fetch<ArticleStub[]>(relatedArticlesQuery, {
    categoria: article.categoria,
    slug: article.slug.current,
  })

  const articleUrl = `https://pessoasglobais.com/edicoes/${edicao}/${slug}`
  const coverUrl = article.imagemCapa
    ? urlFor(article.imagemCapa).width(1440).height(630).quality(85).url()
    : null
  const authorInitial = article.autor?.[0]?.toUpperCase() ?? 'A'
  const dateLabel = article.dataPublicacao
    ? format(new Date(article.dataPublicacao), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
    : ''

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* ── Article Header ── */}
      <header className="bg-pg-navy px-5 pb-12 pt-16">
        <div className="mx-auto max-w-[780px]">

          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <EditionBadge number={article.edicao.numero} theme={format(new Date(article.dataPublicacao), "MMMM yyyy", { locale: ptBR })} />
            <span className="rounded-sm bg-pg-tag px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
              {article.categoria}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-display text-[2.25rem] font-black leading-[1.05] text-white md:text-[3rem]">
            {article.titulo}
          </h1>

          {/* Deck */}
          <p className="mb-8 font-body text-[20px] font-light italic leading-[1.65] text-white/70">
            {article.linhaFina}
          </p>

          {/* Byline + share */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pg-red">
                <span className="font-display text-sm font-bold text-white">{authorInitial}</span>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">{article.autor}</p>
                <p className="font-mono text-[10px] text-white/50">
                  {dateLabel}{article.tempoLeitura ? ` · ${article.tempoLeitura} min de leitura` : ''}
                </p>
              </div>
            </div>
            <ShareButtons url={articleUrl} title={article.titulo} />
          </div>
        </div>
      </header>

      {/* ── Cover image ── */}
      {coverUrl ? (
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt={article.titulo} className="h-full w-full object-cover" />
          {article.legendaImagem && (
            <p className="absolute bottom-3 left-0 right-0 text-center font-body text-[13px] text-white/70">
              {article.legendaImagem}
            </p>
          )}
        </div>
      ) : (
        <div className="aspect-[16/7] w-full bg-gradient-to-r from-pg-navy-dark via-pg-navy to-pg-navy-light" />
      )}

      {/* ── Article body ── */}
      <div className="mx-auto max-w-[780px] px-5 py-12">

        {/* Highlights */}
        {article.destaques?.length > 0 && (
          <div className="mb-10 border-l-[3px] border-pg-red bg-pg-highlight px-8 py-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-pg-red">
              Destaques desta matéria
            </p>
            <ul className="space-y-2.5">
              {article.destaques.map((h, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-[13px] leading-[1.5] text-pg-ink">
                  <span className="mt-px font-bold text-pg-red">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body — CSS columns, blockquote/h2/images span full width via [column-span:all] */}
        {article.corpo?.length > 0 && (
          <div className="article-body columns-1 gap-10 md:columns-2 md:gap-12">
            <PortableText value={article.corpo} components={articleBodyComponents} />
          </div>
        )}

        {/* Standalone pull quote (citacaoDestaque field) */}
        {article.citacaoDestaque?.texto && (
          <PullQuote
            quote={article.citacaoDestaque.texto}
            author={article.citacaoDestaque.autor}
            variant="full-width"
          />
        )}

        {/* Mini bio */}
        {article.entrevistado && (
          <div className="mt-12">
            <MiniBio
              name={article.entrevistado.nome}
              title={[article.entrevistado.titulo, article.entrevistado.empresa].filter(Boolean).join(', ')}
              bio={article.entrevistado.bio}
              instagram={
                article.entrevistado.instagram
                  ? article.entrevistado.instagram.replace(/.*instagram\.com\//, '').replace(/\/$/, '')
                  : undefined
              }
              edition={`Ed. #${article.edicao.numero}`}
            />
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <CTABanner />

      {/* ── Related articles ── */}
      {relatedArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
            Leia também
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a._id} {...toCardProps(a)} />
            ))}
          </div>
        </section>
      )}

      <NewsletterSignup />
    </main>
  )
}
