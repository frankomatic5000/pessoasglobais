import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  featuredArticleQuery,
  homepageGridQuery,
  allEditionsQuery,
  type Article,
  type ArticleStub,
  type Edicao,
} from '@/sanity/lib/queries'
import { EditionStrip } from '@/components/magazine/EditionStrip'
import { CategoriesBar } from '@/components/magazine/CategoriesBar'
import { BentoGrid } from '@/components/magazine/BentoGrid'
import { MediaBlock } from '@/components/magazine/MediaBlock'
import { NewsletterSignup } from '@/components/magazine/NewsletterSignup'
import { CTABanner } from '@/components/magazine/CTABanner'

export const revalidate = 60

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [featured, gridArticles, editions] = await Promise.all([
    client.fetch<Article | null>(featuredArticleQuery),
    client.fetch<ArticleStub[]>(homepageGridQuery),
    client.fetch<Edicao[]>(allEditionsQuery),
  ])

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* 1 · Edition Strip — driven by Sanity editions */}
      <EditionStrip editions={editions} />

      {/* 2 · Hero — Featured Article */}
      {featured ? (
        <section className="grid grid-cols-1 md:grid-cols-2">

          {/* Left — cover image or gradient */}
          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-pg-navy-dark via-pg-navy to-pg-navy-light md:min-h-[600px]">
            {featured.imagemCapa && (
              <Image
                src={urlFor(featured.imagemCapa).width(900).quality(85).url()}
                alt={featured.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-pg-navy/40" />

            {/* Edition badge */}
            <div className="absolute left-6 top-6 z-10">
              <span className="inline-block rounded-sm bg-pg-red px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
                Ed. #{featured.edicao.numero} · {featured.categoria}
              </span>
            </div>

            {/* Gradient fade to right (desktop) */}
            <div className="absolute bottom-0 right-0 top-0 hidden w-20 bg-gradient-to-r from-transparent to-pg-paper md:block" />
          </div>

          {/* Right — content */}
          <div className="flex flex-col justify-center border-l-4 border-pg-red bg-pg-surface px-8 py-10 md:px-12">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
              {featured.categoria}
            </p>
            <h1 className="mb-4 font-display text-[1.85rem] font-black leading-[1.05] text-pg-navy md:text-[2.25rem]">
              {featured.titulo}
            </h1>
            <p className="mb-6 font-body text-[17px] leading-[1.65] text-pg-muted">
              {featured.linhaFina}
            </p>

            {/* Byline */}
            <div className="mb-6 flex items-center gap-3 border-b border-pg-border pb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted">
                por {featured.autor}
              </span>
              <span className="rounded-sm bg-pg-navy px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
                Ed. #{featured.edicao.numero}
              </span>
              {featured.dataPublicacao && (
                <span className="font-mono text-[10px] text-pg-muted">
                  {format(new Date(featured.dataPublicacao), "d MMM yyyy", { locale: ptBR })}
                </span>
              )}
            </div>

            {/* Highlights box */}
            {featured.destaques?.length > 0 && (
              <div className="mb-6 border-l-[3px] border-pg-red bg-pg-highlight px-8 py-6">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-pg-red">
                  Destaques desta matéria
                </p>
                <ul className="space-y-2.5">
                  {featured.destaques.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-[13px] leading-[1.5] text-pg-ink">
                      <span className="mt-px font-bold text-pg-red">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href={`/edicoes/${featured.edicao.slug.current}/${featured.slug.current}`}
              className="self-start rounded-sm bg-pg-red px-7 py-3.5 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
            >
              Ler matéria completa →
            </Link>
          </div>
        </section>
      ) : (
        /* Fallback when no featured article exists in CMS yet */
        <div className="flex min-h-[300px] items-center justify-center bg-pg-navy">
          <p className="font-body text-white/60">Nenhuma matéria em destaque.</p>
        </div>
      )}

      {/* 3 · Categories Bar */}
      <CategoriesBar />

      {/* 4 · Bento Grid */}
      <BentoGrid articles={gridArticles} />

      {/* 5 · Media / Podcast Block */}
      <MediaBlock />

      {/* 6 · Newsletter */}
      <NewsletterSignup />

      {/* 7 · CTA Banner */}
      <CTABanner />
    </main>
  )
}
