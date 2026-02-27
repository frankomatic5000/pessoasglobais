import Link from 'next/link'
import { CTABanner } from '@/components/magazine/CTABanner'

const TEAM = [
  {
    name: 'Marina Vasconcelos',
    role: 'Editora-Chefe',
    bio: 'Jornalista com 15 anos de experiência em mídia de negócios. Passou por Exame, Forbes Brasil e El País. Cobre empreendedorismo global e liderança feminina.',
    initial: 'M',
  },
  {
    name: 'Theo Nakamura',
    role: 'Diretor Criativo',
    bio: 'Designer editorial formado pela FAUUSP, com passagens por publicações em Lisboa, Berlim e Tóquio. Responsável pela identidade visual da Pessoas Globais.',
    initial: 'T',
  },
]

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-pg-paper">

      {/* Header */}
      <header className="bg-pg-navy px-5 py-16 text-center">
        <div className="mx-auto max-w-[640px]">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Sobre nós
          </p>
          <h1 className="mb-4 font-display text-[2.5rem] font-black leading-[1.05] text-white md:text-[3rem]">
            A revista dos<br />empreendedores globais
          </h1>
          <p className="font-body text-[17px] leading-[1.65] text-white/70">
            Pessoas Globais é uma publicação premium dedicada a histórias de fundadores multiculturais, líderes da diáspora e pensadores que constroem impacto além de fronteiras.
          </p>
        </div>
      </header>

      {/* Mission */}
      <section className="mx-auto max-w-[780px] px-5 py-16">
        <div className="border-l-[3px] border-pg-red pl-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red mb-4">
            Nossa missão
          </p>
          <p className="font-display text-[1.5rem] font-normal italic leading-[1.5] text-pg-navy">
            Acreditamos que as histórias mais importantes do empreendedorismo global ainda não foram contadas. Nascemos para dar voz a quem constrói mundos melhores — e conectar essas histórias a quem precisa ouvi-las.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { number: '#1', label: 'Edição publicada' },
            { number: '12+', label: 'Países representados' },
            { number: '5', label: 'Idiomas na diáspora' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-[3rem] font-black text-pg-red leading-none mb-1">{stat.number}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-pg-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-pg-tag px-5 py-16">
        <div className="mx-auto max-w-[780px]">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
            Equipe editorial
          </p>
          <h2 className="mb-10 font-display text-[1.75rem] font-bold text-pg-navy">
            As pessoas por trás da publicação
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-sm border-t-2 border-pg-red bg-pg-surface p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pg-navy">
                  <span className="font-display text-xl font-bold text-white">{member.initial}</span>
                </div>
                <p className="font-display text-[1rem] font-bold text-pg-navy">{member.name}</p>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-pg-red">{member.role}</p>
                <p className="font-body text-[14px] leading-[1.6] text-pg-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GrowBiz attribution */}
      <section className="mx-auto max-w-[780px] px-5 py-16 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-muted">
          Parte do ecossistema
        </p>
        <h2 className="mb-4 font-display text-[1.5rem] font-bold text-pg-navy">GrowBiz Media</h2>
        <p className="mx-auto mb-6 max-w-[480px] font-body text-[15px] leading-[1.6] text-pg-muted">
          A Pessoas Globais faz parte da família GrowBiz Media — o ecossistema de mídia dedicado ao empreendedorismo da nova geração.
        </p>
        <a
          href="https://growbiz.media"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm border border-pg-navy px-6 py-3 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-pg-navy no-underline transition-colors hover:bg-pg-navy hover:text-white"
        >
          Visitar GrowBiz Media ↗
        </a>
      </section>

      <CTABanner />
    </main>
  )
}
