import Link from 'next/link'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { CTABanner } from '@/components/magazine/CTABanner'
import { NewsletterSignup } from '@/components/magazine/NewsletterSignup'

type PageProps = { params: Promise<{ edicao: string }> }

// Static data — replace with Sanity GROQ query
const EDITION_DATA: Record<string, {
  number: number
  theme: string
  date: string
  editorial: string
  prevSlug: string | null
  nextSlug: string | null
}> = {
  'edicao-1': {
    number: 1,
    theme: 'Liderança Global',
    date: 'Fevereiro 2026',
    editorial: 'Esta edição inaugural nasceu de uma crença simples: os empreendedores mais fascinantes do nosso tempo são aqueles que atravessam fronteiras — geográficas, culturais e mentais. Abrimos com histórias de líderes que transformaram origem em vantagem, e diáspora em diferencial competitivo.',
    prevSlug: null,
    nextSlug: null,
  },
}

const COVER_STORY = {
  category: 'Liderança',
  title: 'Como Daniela Chaves construiu um império de moda sustentável em três continentes',
  deck: 'Da favela de Fortaleza ao centro de Paris — a história de uma empreendedora que transformou a herança cultural em vantagem competitiva global.',
  author: 'por Rodrigo Lima',
  edition: 'Ed. #1',
  href: '/edicoes/edicao-1/daniela-chaves',
  accentClass: 'from-pg-navy-dark via-pg-navy to-pg-navy-light',
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

export function generateStaticParams() {
  return [{ edicao: 'edicao-1' }]
}

export default async function EdicaoPage({ params }: PageProps) {
  const { edicao } = await params
  const ed = EDITION_DATA[edicao] ?? EDITION_DATA['edicao-1']

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Edition header */}
      <header className="bg-pg-navy px-5 py-16">
        <div className="mx-auto max-w-[780px]">
          <span className="mb-6 inline-block rounded-sm bg-pg-red px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
            Edição #{ed.number} · {ed.date}
          </span>
          <h1 className="mb-4 font-display text-[2.5rem] font-black leading-[1.05] text-white md:text-[3rem]">
            {ed.theme}
          </h1>
          <p className="font-body text-[17px] italic leading-[1.65] text-white/70">
            {ed.editorial}
          </p>
        </div>
      </header>

      {/* Cover story */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
          Matéria de capa
        </p>
        {/* Featured cover story — wider single card */}
        <div className="lg:max-w-[680px]">
          <ArticleCard {...COVER_STORY} />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-5">
        <div className="border-t-2 border-pg-red" />
      </div>

      {/* Articles grid */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
          Todas as matérias desta edição
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Edition navigation */}
      <nav className="border-t border-pg-border px-5 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {ed.prevSlug ? (
            <Link
              href={`/edicoes/${ed.prevSlug}`}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red"
            >
              ← Edição anterior
            </Link>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-border">
              ← Edição anterior
            </span>
          )}

          <Link
            href="/edicoes"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red"
          >
            Ver todas as edições
          </Link>

          {ed.nextSlug ? (
            <Link
              href={`/edicoes/${ed.nextSlug}`}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red"
            >
              Próxima edição →
            </Link>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-pg-border">
              Próxima edição →
            </span>
          )}
        </div>
      </nav>

      <NewsletterSignup />
      <CTABanner />
    </main>
  )
}
