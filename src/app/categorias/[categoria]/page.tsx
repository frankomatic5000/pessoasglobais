import Link from 'next/link'
import { ArticleCard } from '@/components/magazine/ArticleCard'

type PageProps = { params: Promise<{ categoria: string }> }

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  lideranca: {
    name: 'Liderança',
    description: 'Perfis de líderes que estão redefinindo o que significa liderar em escala global.',
  },
  negocios: {
    name: 'Negócios',
    description: 'Estratégias, modelos e casos de negócios que cruzam fronteiras e culturas.',
  },
  cultura: {
    name: 'Cultura',
    description: 'A interseção entre identidade cultural e empreendedorismo criativo.',
  },
  diaspora: {
    name: 'Diáspora',
    description: 'Histórias de brasileiros e multiculturais que constroem impacto fora de suas terras natais.',
  },
  tecnologia: {
    name: 'Tecnologia',
    description: 'Inovação tecnológica com raízes culturais profundas.',
  },
}

const OTHER_CATEGORIES = [
  { slug: 'lideranca', name: 'Liderança' },
  { slug: 'negocios', name: 'Negócios' },
  { slug: 'cultura', name: 'Cultura' },
  { slug: 'diaspora', name: 'Diáspora' },
  { slug: 'tecnologia', name: 'Tecnologia' },
]

// Static articles — replace with Sanity GROQ filtered query
const ARTICLES = [
  {
    id: 1,
    category: 'Liderança',
    title: 'Como Daniela Chaves construiu um império de moda sustentável em três continentes',
    deck: 'Da favela de Fortaleza ao centro de Paris — herança cultural como vantagem competitiva.',
    author: 'por Rodrigo Lima',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/daniela-chaves',
    accentClass: 'from-pg-navy-dark via-pg-navy to-pg-navy-light',
  },
  {
    id: 2,
    category: 'Negócios',
    title: 'O método brasileiro de gestão que o Silicon Valley está adotando',
    deck: 'Executivos do Vale do Silício descobrem no jeitinho brasileiro uma vantagem competitiva única.',
    author: 'por Ana Ferreira',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/metodo-brasileiro',
    accentClass: 'from-pg-navy-dark via-pg-navy to-pg-navy-light',
  },
  {
    id: 3,
    category: 'Diáspora',
    title: 'Lisboa, Dubai ou Toronto: onde os brasileiros estão prosperando mais?',
    deck: 'Um mapeamento inédito dos destinos preferidos da diáspora empreendedora brasileira.',
    author: 'por Carlos Mendes',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/diaspora-destinos',
    accentClass: 'from-pg-navy to-pg-navy-dark',
  },
]

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((categoria) => ({ categoria }))
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  const meta = CATEGORY_META[categoria] ?? { name: categoria, description: '' }
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
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted">
          {ARTICLES.length} matéria{ARTICLES.length !== 1 ? 's' : ''}
        </p>
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
                className="rounded-sm border border-pg-border bg-pg-tag px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted no-underline transition-colors hover:bg-pg-red hover:text-white hover:border-pg-red"
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
