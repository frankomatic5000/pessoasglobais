import Link from 'next/link'

const EDITIONS = [
  {
    number: 1,
    theme: 'Liderança Global',
    date: 'Fevereiro 2026',
    slug: 'edicao-1',
    articleCount: 4,
    published: true,
    description: 'Fundadores que transformaram origem cultural em vantagem competitiva global.',
  },
  {
    number: 2,
    theme: 'Diáspora & Negócios',
    date: 'Março 2026',
    slug: 'edicao-2',
    articleCount: 0,
    published: false,
    description: 'Em breve.',
  },
  {
    number: 3,
    theme: 'Tecnologia com Raízes',
    date: 'Abril 2026',
    slug: 'edicao-3',
    articleCount: 0,
    published: false,
    description: 'Em breve.',
  },
]

export default function EdicoesPage() {
  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Header */}
      <header className="bg-pg-navy px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Arquivo
          </p>
          <h1 className="font-display text-[2.5rem] font-black leading-[1.05] text-white">
            Todas as edições
          </h1>
        </div>
      </header>

      {/* Editions grid */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDITIONS.map((ed) => (
            <div
              key={ed.number}
              className={`rounded-sm border border-pg-border bg-pg-surface overflow-hidden ${!ed.published ? 'opacity-60' : ''}`}
            >
              {/* Color block */}
              <div className={`h-2 w-full ${ed.published ? 'bg-pg-red' : 'bg-pg-border'}`} />

              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className={`inline-block rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white ${ed.published ? 'bg-pg-red' : 'bg-pg-muted'}`}>
                      #{ed.number}
                    </span>
                  </div>
                  {ed.published && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-red">
                      Publicada ★
                    </span>
                  )}
                </div>

                <h2 className="mb-1 font-display text-[1.25rem] font-bold text-pg-navy">
                  {ed.theme}
                </h2>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted">
                  {ed.date}
                </p>
                <p className="mb-5 font-body text-[14px] leading-[1.6] text-pg-muted">
                  {ed.description}
                </p>

                {ed.published ? (
                  <Link
                    href={`/edicoes/${ed.slug}`}
                    className="inline-block rounded-sm bg-pg-red px-5 py-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
                  >
                    Ver edição → ({ed.articleCount} matérias)
                  </Link>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted">
                    Em breve
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
