import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { ArticleStub } from '@/sanity/lib/queries'

interface BentoGridProps {
  articles: ArticleStub[]
}

export function BentoGrid({ articles }: BentoGridProps) {
  if (articles.length === 0) return null

  const [hero, ...rest] = articles

  return (
    <section className="bg-pg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-[1.85rem] font-bold text-pg-navy md:text-[2rem]">
              Artigos em Destaque
            </h2>
            <p className="mt-1.5 font-body text-pg-muted">
              As matérias mais lidas desta edição
            </p>
          </div>
          <Link
            href="/edicoes"
            className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-pg-red no-underline transition-colors hover:text-pg-red-dark md:inline-flex"
          >
            Ver Todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {/* Large hero card — spans 2 cols */}
          <Link
            href={`/edicoes/${hero.edicao.slug.current}/${hero.slug.current}`}
            className="group block no-underline md:col-span-2"
          >
            <div className="relative min-h-[320px] overflow-hidden rounded-sm bg-pg-navy transition-transform hover:scale-[1.01] lg:min-h-[400px]">
              {hero.imagemCapa && (
                <Image
                  src={urlFor(hero.imagemCapa).width(1200).quality(80).url()}
                  alt={hero.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pg-navy via-pg-navy/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="mb-3 inline-block rounded-sm bg-pg-red px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                  {hero.categoria?.nome}
                </span>
                <h3 className="mb-2 font-display text-2xl font-bold leading-[1.15] text-white transition-colors group-hover:text-pg-red-light lg:text-3xl">
                  {hero.titulo}
                </h3>
                <p className="max-w-md font-body text-sm text-white/70">
                  {hero.linhaFina}
                </p>
              </div>
            </div>
          </Link>

          {/* Smaller cards */}
          {rest.map((article) => (
            <Link
              key={article._id}
              href={`/edicoes/${article.edicao.slug.current}/${article.slug.current}`}
              className="group block no-underline"
            >
              <div className="h-full rounded-sm border border-pg-border bg-pg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="mb-4 inline-block rounded-sm bg-pg-tag px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-pg-muted">
                  {article.categoria?.nome}
                </span>
                <h3 className="mb-2 font-display text-xl font-bold leading-snug text-pg-navy transition-colors group-hover:text-pg-red">
                  {article.titulo}
                </h3>
                <p className="font-body text-sm leading-relaxed text-pg-muted">
                  {article.linhaFina}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
