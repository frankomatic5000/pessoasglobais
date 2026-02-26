import Link from 'next/link'
import { EditionStrip } from '@/components/magazine/EditionStrip'
import { CategoriesBar } from '@/components/magazine/CategoriesBar'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { NewsletterSignup } from '@/components/magazine/NewsletterSignup'
import { CTABanner } from '@/components/magazine/CTABanner'

// ─── Static content (replace with Sanity GROQ queries when ready) ───────────

const FEATURED = {
  category: 'Liderança',
  edition: 'Ed. #1 · Fevereiro 2026',
  editionSlug: 'edicao-1',
  slug: 'daniela-chaves',
  title: 'Como Daniela Chaves construiu um império de moda sustentável em três continentes',
  deck: 'Da favela de Fortaleza ao centro de Paris — a história de uma empreendedora que transformou a herança cultural em vantagem competitiva global.',
  author: 'por Rodrigo Lima',
  highlights: [
    'Fundou sua primeira empresa aos 19 anos, sem capital externo',
    'Presente em 12 países com faturamento anual de R$ 40 milhões',
    'Pioneira no uso de fibras amazônicas na moda de luxo internacional',
  ],
}

const ARTICLES = [
  {
    id: 1,
    category: 'Negócios',
    title: 'O método brasileiro de gestão que o Silicon Valley está adotando',
    deck: 'Executivos do Vale do Silício descobrem no jeitinho brasileiro uma vantagem competitiva única.',
    author: 'por Ana Ferreira',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/metodo-brasileiro',
    accentClass: 'from-pg-navy-dark via-pg-navy to-pg-navy-light',
  },
  {
    id: 2,
    category: 'Diáspora',
    title: 'Lisboa, Dubai ou Toronto: onde os brasileiros estão prosperando mais?',
    deck: 'Um mapeamento inédito dos destinos preferidos dos empreendedores da diáspora brasileira.',
    author: 'por Carlos Mendes',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/diaspora-destinos',
    accentClass: 'from-pg-navy to-pg-navy-dark',
  },
  {
    id: 3,
    category: 'Tecnologia',
    title: 'A startup que quer democratizar o acesso aos mercados africanos para empresas latinas',
    deck: 'Fundada por uma brasileira e um ganense, a plataforma já conectou mais de 300 empresas em dois continentes.',
    author: 'por Juliana Souza',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/startup-africa-latam',
    accentClass: 'from-pg-ink via-pg-navy-dark to-pg-navy',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-pg-paper">

      {/* 1 · Edition Strip */}
      <EditionStrip />

      {/* 2 · Hero — Featured Article */}
      <section className="grid grid-cols-1 md:grid-cols-2">

        {/* Left — editorial image placeholder */}
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-pg-navy-dark via-pg-navy to-pg-navy-light md:min-h-[600px]">
          {/* Decorative large number */}
          <span className="select-none font-display text-[180px] font-black leading-none text-white opacity-[0.06]">
            #1
          </span>

          {/* Edition badge */}
          <div className="absolute left-6 top-6">
            <span className="inline-block rounded-sm bg-pg-red px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
              {FEATURED.edition}
            </span>
          </div>

          {/* Gradient fade to right (desktop) */}
          <div className="absolute bottom-0 right-0 top-0 hidden w-20 bg-gradient-to-r from-transparent to-pg-paper md:block" />

          {/* Bottom scrim */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-pg-navy-dark/40 to-transparent" />
        </div>

        {/* Right — content */}
        <div className="flex flex-col justify-center border-l-4 border-pg-red bg-pg-surface px-8 py-10 md:px-12">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            {FEATURED.category}
          </p>

          <h1 className="mb-4 font-display text-[1.85rem] font-black leading-[1.05] text-pg-navy md:text-[2.25rem]">
            {FEATURED.title}
          </h1>

          <p className="mb-6 font-body text-[17px] leading-[1.65] text-pg-muted">
            {FEATURED.deck}
          </p>

          {/* Byline */}
          <div className="mb-6 flex items-center gap-3 border-b border-pg-border pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted">
              {FEATURED.author}
            </span>
            <span className="rounded-sm bg-pg-navy px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
              Ed. #1
            </span>
          </div>

          {/* Highlights box */}
          <div className="mb-6 border-l-[3px] border-pg-red bg-pg-highlight px-8 py-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-pg-red">
              Destaques desta matéria
            </p>
            <ul className="space-y-2.5">
              {FEATURED.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-[13px] leading-[1.5] text-pg-ink">
                  <span className="mt-px font-bold text-pg-red">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/edicoes/${FEATURED.editionSlug}/${FEATURED.slug}`}
            className="self-start rounded-sm bg-pg-red px-7 py-3.5 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
          >
            Ler matéria completa →
          </Link>
        </div>
      </section>

      {/* 3 · Categories Bar */}
      <CategoriesBar />

      {/* 4 · Article Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-[1.4rem] font-bold text-pg-navy">
            Nesta edição
          </h2>
          <Link
            href="/edicoes/edicao-1"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted no-underline transition-colors hover:text-pg-red"
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <ArticleCard
              key={article.id}
              category={article.category}
              title={article.title}
              deck={article.deck}
              author={article.author}
              edition={article.edition}
              href={article.href}
              accentClass={article.accentClass}
            />
          ))}
        </div>
      </section>

      {/* 5 · Newsletter Signup */}
      <NewsletterSignup />

      {/* 6 · CTA Banner */}
      <CTABanner />

      {/* Footer */}
      <footer className="border-t border-pg-border bg-pg-surface px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-normal text-pg-ink">Pessoas</span>
            <span className="font-display text-sm font-bold text-pg-red">Globais</span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted">
              · parte da GrowBiz Media
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/sobre" className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline hover:text-pg-red">
              Sobre
            </Link>
            <Link href="/tenha-sua-materia" className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline hover:text-pg-red">
              Tenha sua Matéria
            </Link>
            <a
              href="https://growbiz.media"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline hover:text-pg-red"
            >
              GrowBiz Media ↗
            </a>
          </div>
          <p className="font-mono text-[10px] text-pg-muted">© 2026 Pessoas Globais</p>
        </div>
      </footer>
    </main>
  )
}
