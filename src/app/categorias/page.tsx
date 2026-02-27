import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categorias — Pessoas Globais',
  description: 'Explore as categorias da revista Pessoas Globais.',
}

const CATEGORIES = [
  { slug: 'lideranca',  name: 'Liderança',   description: 'Perfis de líderes que estão redefinindo o que significa liderar em escala global.' },
  { slug: 'negocios',   name: 'Negócios',    description: 'Estratégias, modelos e casos de negócios que cruzam fronteiras e culturas.' },
  { slug: 'cultura',    name: 'Cultura',     description: 'A interseção entre identidade cultural e empreendedorismo criativo.' },
  { slug: 'diaspora',   name: 'Diáspora',    description: 'Histórias de brasileiros e multiculturais que constroem impacto além-fronteiras.' },
  { slug: 'tecnologia', name: 'Tecnologia',  description: 'Inovação tecnológica com raízes culturais profundas.' },
]

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-pg-paper">
      <header className="bg-pg-navy px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Navegue por tema
          </p>
          <h1 className="font-display text-[2.5rem] font-black leading-[1.05] text-white">
            Categorias
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group block no-underline rounded-sm border border-pg-border bg-pg-surface p-6 transition-all hover:-translate-y-1 hover:border-pg-red hover:shadow-lg"
            >
              <span className="mb-3 inline-block rounded-sm bg-pg-red px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {cat.name}
              </span>
              <p className="font-body text-sm leading-relaxed text-pg-muted">
                {cat.description}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-pg-red opacity-0 transition-opacity group-hover:opacity-100">
                Ver matérias →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
