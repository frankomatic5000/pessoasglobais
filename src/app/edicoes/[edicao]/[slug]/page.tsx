import { EditionBadge } from '@/components/magazine/EditionBadge'
import { PullQuote } from '@/components/magazine/PullQuote'
import { MiniBio } from '@/components/magazine/MiniBio'
import { ShareButtons } from '@/components/magazine/ShareButtons'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { CTABanner } from '@/components/magazine/CTABanner'
import { NewsletterSignup } from '@/components/magazine/NewsletterSignup'

type PageProps = { params: Promise<{ edicao: string; slug: string }> }

// Static content — replace with Sanity GROQ query using params
const ARTICLE = {
  category: 'Liderança',
  edition: { number: 1, theme: 'Fevereiro 2026' },
  title: 'Como Daniela Chaves construiu um império de moda sustentável em três continentes',
  deck: 'Da favela de Fortaleza ao centro de Paris — a história de uma empreendedora que transformou a herança cultural em vantagem competitiva global.',
  author: { name: 'Rodrigo Lima', initial: 'R' },
  date: '26 Fev 2026',
  readTime: '8 min',
  highlights: [
    'Fundou sua primeira empresa aos 19 anos, sem capital externo',
    'Presente em 12 países com faturamento anual de R$ 40 milhões',
    'Pioneira no uso de fibras amazônicas na moda de luxo internacional',
  ],
  body1col1: [
    'Daniela Chaves tinha 19 anos quando decidiu transformar os retalhos de tecido que sua mãe usava para confeccionar uniformes escolares em Fortaleza em produto de luxo. Sem capital externo, com apenas um portfólio de peças costuradas à mão e uma conta de e-mail recém-criada, ela fechou sua primeira venda internacional por 800 dólares — para uma boutique em Lisboa que havia visto sua coleção numa publicação de design sustentável.',
    'A virada definitiva veio em 2017, quando o Studio Chaves foi selecionado para participar de uma feira de moda ética em Paris. Daniela não tinha dinheiro para hotel, dormiu no sofá de uma amiga angolana e chegou ao pavilhão carregando as peças ela mesma. No fim do primeiro dia, havia esgotado o estoque e saído com pedidos de seis países diferentes.',
  ],
  body1col2: [
    'Hoje, aos 34 anos, ela comanda um ateliê em Paris, escritórios em São Paulo e Lagos, e uma rede de fornecedores que atravessa o Amazonas, a savana ghanense e os mercados têxteis de Marrocos. O faturamento anual ultrapassa 40 milhões de reais. Mas o que torna a trajetória de Daniela singular não é a escala — é o método.',
    'O segredo, ela explica, está na inversão da cadeia de valor. Em vez de criar para depois buscar mercado, o Studio Chaves mapeia os fluxos culturais e migratórios antes de desenhar uma única peça. "A diáspora não é só um mercado", diz Daniela. "É uma linguagem. E eu aprendi a falar essa linguagem desde criança."',
  ],
  pullQuote: {
    text: 'O Brasil não me deu capital. Mas me deu algo que nenhum fundo de investimento pode comprar: a capacidade de criar com o que você tem.',
    author: 'Daniela Chaves',
    title: 'Fundadora, Studio Chaves',
  },
  body2col1: [
    'O próximo capítulo é Dubai. Em março, a marca abre sua primeira loja física no Oriente Médio, numa galeria que já abriga etiquetas de Lagos, Nairobi e Beirute. A escolha não é por acaso: Dubai se tornou o principal hub da diáspora africana e árabe de classe alta, um público que valoriza exatamente o que o Studio Chaves oferece — peças com memória, com raiz, com propósito.',
  ],
  body2col2: [
    'Para outras empreendedoras que tentam replicar esse modelo, Daniela tem um conselho direto: "Não tente apagar sua origem para se parecer global. É exatamente sua origem que te faz global." Uma lição que levou 15 anos para aprender, e que agora conta ao mundo — uma edição de cada vez.',
  ],
  person: {
    name: 'Daniela Chaves',
    title: 'Fundadora e Diretora Criativa, Studio Chaves',
    bio: 'Empreendedora cearense com base em Paris. Pioneira no uso de fibras amazônicas na moda de luxo global. Forbes Under 40 América Latina, 2023.',
    instagram: 'studiochaves',
    edition: 'Ed. #1 · Fev 2026',
  },
}

const RELATED = [
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
    deck: 'Um mapeamento inédito dos destinos preferidos da diáspora empreendedora brasileira.',
    author: 'por Carlos Mendes',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/diaspora-destinos',
    accentClass: 'from-pg-navy to-pg-navy-dark',
  },
  {
    id: 3,
    category: 'Tecnologia',
    title: 'A startup que quer democratizar o acesso aos mercados africanos para empresas latinas',
    deck: 'Plataforma luso-ganense conectou mais de 300 empresas em dois continentes.',
    author: 'por Juliana Souza',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/startup-africa-latam',
    accentClass: 'from-pg-ink via-pg-navy-dark to-pg-navy',
  },
]

export function generateStaticParams() {
  return [{ edicao: 'edicao-1', slug: 'daniela-chaves' }]
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const articleUrl = `https://pessoasglobais.com/edicoes/edicao-1/${slug}`

  return (
    <main className="min-h-screen bg-pg-paper">

      {/* ── Article Header ── */}
      <header className="bg-pg-navy px-5 pb-12 pt-16">
        <div className="mx-auto max-w-[780px]">

          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <EditionBadge number={ARTICLE.edition.number} theme={ARTICLE.edition.theme} />
            <span className="rounded-sm bg-pg-tag px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
              {ARTICLE.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-display text-[2.25rem] font-black leading-[1.05] text-white md:text-[3rem]">
            {ARTICLE.title}
          </h1>

          {/* Deck */}
          <p className="mb-8 font-body text-[20px] font-light italic leading-[1.65] text-white/70">
            {ARTICLE.deck}
          </p>

          {/* Byline row */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pg-red">
                <span className="font-display text-sm font-bold text-white">{ARTICLE.author.initial}</span>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">{ARTICLE.author.name}</p>
                <p className="font-mono text-[10px] text-white/50">
                  {ARTICLE.date} · {ARTICLE.readTime} de leitura
                </p>
              </div>
            </div>
            <ShareButtons url={articleUrl} title={ARTICLE.title} />
          </div>
        </div>
      </header>

      {/* ── Cover image placeholder ── */}
      <div className="aspect-[16/7] w-full overflow-hidden bg-gradient-to-r from-pg-navy-dark via-pg-navy to-pg-navy-light">
        <div className="flex h-full items-center justify-center opacity-[0.05]">
          <span className="select-none font-display text-[20vw] font-black text-white leading-none">PG</span>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="mx-auto max-w-[780px] px-5 py-12">

        {/* Highlights box */}
        <div className="mb-10 border-l-[3px] border-pg-red bg-pg-highlight px-8 py-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-pg-red">
            Destaques desta matéria
          </p>
          <ul className="space-y-2.5">
            {ARTICLE.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-[13px] leading-[1.5] text-pg-ink">
                <span className="mt-px font-bold text-pg-red">→</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Body — part 1 (2-col) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-5">
            {ARTICLE.body1col1.map((para, i) => (
              <p
                key={i}
                className={`font-body text-[16px] leading-[1.85] text-pg-ink text-justify ${
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[3.5em] first-letter:font-black first-letter:leading-[0.85] first-letter:text-pg-red'
                    : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>
          <div className="space-y-5">
            {ARTICLE.body1col2.map((para, i) => (
              <p key={i} className="font-body text-[16px] leading-[1.85] text-pg-ink text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Full-width pull quote */}
        <PullQuote
          quote={ARTICLE.pullQuote.text}
          author={ARTICLE.pullQuote.author}
          authorTitle={ARTICLE.pullQuote.title}
          variant="full-width"
        />

        {/* Body — part 2 (2-col) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-5">
            {ARTICLE.body2col1.map((para, i) => (
              <p key={i} className="font-body text-[16px] leading-[1.85] text-pg-ink text-justify">
                {para}
              </p>
            ))}
          </div>
          <div className="space-y-5">
            {ARTICLE.body2col2.map((para, i) => (
              <p key={i} className="font-body text-[16px] leading-[1.85] text-pg-ink text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Mini bio */}
        <div className="mt-12">
          <MiniBio
            name={ARTICLE.person.name}
            title={ARTICLE.person.title}
            bio={ARTICLE.person.bio}
            instagram={ARTICLE.person.instagram}
            edition={ARTICLE.person.edition}
          />
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <CTABanner />

      {/* ── Related articles ── */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
          Leia também
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      <NewsletterSignup />
    </main>
  )
}
