import { ArticleCard } from '@/components/magazine/ArticleCard'
import { ContactForm } from '@/components/magazine/ContactForm'
import { FAQAccordion } from '@/components/magazine/FAQAccordion'

const INCLUDED = [
  {
    icon: '✍',
    title: 'Matéria editorial profissional',
    desc: 'Entrevista aprofundada com jornalista especializado, redação editorial e revisão colaborativa.',
  },
  {
    icon: '📷',
    title: 'Sessão fotográfica editorial',
    desc: 'Produção fotográfica de alto padrão, direcionada à identidade visual da sua marca.',
  },
  {
    icon: '🌐',
    title: 'Distribuição digital + SEO',
    desc: 'Publicação otimizada para mecanismos de busca, distribuição para assinantes e amplificação nas redes.',
  },
  {
    icon: '🤝',
    title: 'Rede Pessoas Globais',
    desc: 'Sua história chega a empreendedores, investidores e parceiros de 12+ países através da nossa comunidade.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Depois da publicação, recebi mais de 30 contatos de potenciais parceiros internacionais em menos de uma semana.',
    name: 'Marcos Ayres',
    title: 'CEO, Ayres Tech · Lisboa',
  },
  {
    quote: 'A Pessoas Globais capturou a essência da minha trajetória de um jeito que eu nunca consegui explicar sozinha.',
    name: 'Fabiola Osei',
    title: 'Fundadora, Studio Osei · São Paulo / Accra',
  },
]

const EXAMPLES = [
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
    category: 'Tecnologia',
    title: 'A startup que quer democratizar o acesso aos mercados africanos para empresas latinas',
    deck: 'Plataforma luso-ganense conectou mais de 300 empresas em dois continentes.',
    author: 'por Juliana Souza',
    edition: 'Ed. #1',
    href: '/edicoes/edicao-1/startup-africa-latam',
    accentClass: 'from-pg-ink via-pg-navy-dark to-pg-navy',
  },
]

export default function TenhaSuaMateriaPage() {
  return (
    <main className="min-h-screen bg-pg-paper">

      {/* 1 · Hero */}
      <header className="bg-pg-navy px-5 py-20 text-center">
        <div className="mx-auto max-w-[680px]">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Pessoas Globais · Tenha sua Matéria
          </p>
          <h1 className="mb-5 font-display text-[2.5rem] font-black leading-[1.05] text-white md:text-[3.5rem]">
            Sua história merece<br />ser contada ao mundo.
          </h1>
          <p className="mb-8 font-body text-[18px] leading-[1.65] text-white/70">
            Seja a próxima voz da Pessoas Globais. Produções editoriais premium para empreendedores com histórias que inspiram e conectam.
          </p>
          <a
            href="#formulario"
            className="inline-block rounded-sm bg-pg-red px-8 py-4 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
          >
            Quero minha matéria →
          </a>
        </div>
      </header>

      {/* 2 · What's included */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
          O que está incluído
        </p>
        <h2 className="mb-10 font-display text-[1.75rem] font-bold text-pg-navy">
          Uma produção completa, do início ao fim.
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((item) => (
            <div key={item.title} className="rounded-sm border border-pg-border bg-pg-surface p-6">
              <div className="mb-4 text-3xl">{item.icon}</div>
              <h3 className="mb-2 font-display text-[1rem] font-bold text-pg-navy">{item.title}</h3>
              <p className="font-body text-[14px] leading-[1.6] text-pg-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · Published examples */}
      <section className="bg-pg-tag px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Matérias publicadas
          </p>
          <h2 className="mb-8 font-display text-[1.75rem] font-bold text-pg-navy">
            Histórias que já estamos contando.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLES.map((ex) => (
              <ArticleCard key={ex.id} {...ex} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Testimonials */}
      <section className="mx-auto max-w-[780px] px-5 py-16">
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
          Quem já passou pela Pessoas Globais
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="border-l-[3px] border-pg-red bg-pg-highlight py-6 pl-8 pr-6">
              <p className="mb-4 font-display text-[1.1rem] italic leading-[1.5] text-pg-navy">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-display text-[15px] font-bold text-pg-navy">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-red">{t.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · Form */}
      <section id="formulario" className="bg-pg-navy px-5 py-16">
        <div className="mx-auto max-w-[680px]">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Candidatura
          </p>
          <h2 className="mb-2 font-display text-[2rem] font-black text-white">
            Vamos conversar.
          </h2>
          <p className="mb-8 font-body text-[17px] leading-[1.65] text-white/60">
            Preencha o formulário e nossa equipe entrará em contato em até 48 horas úteis.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* 6 · FAQ */}
      <section className="mx-auto max-w-[680px] px-5 py-16">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
          Dúvidas frequentes
        </p>
        <h2 className="mb-8 font-display text-[1.75rem] font-bold text-pg-navy">FAQ</h2>
        <FAQAccordion />
      </section>
    </main>
  )
}
