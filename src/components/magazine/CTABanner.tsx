import Link from 'next/link'

export function CTABanner() {
  return (
    <section className="bg-pg-navy px-5 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-pg-red">
          Pessoas Globais · Tenha sua Matéria
        </p>
        <h2 className="mb-4 font-display text-[2.25rem] font-black leading-[1.05] text-white md:text-[3rem]">
          Sua história merece<br />ser contada ao mundo.
        </h2>
        <p className="mb-8 font-body text-[17px] text-white/60">
          Seja a próxima voz da Pessoas Globais.
        </p>
        <Link
          href="/tenha-sua-materia"
          className="inline-block rounded-sm bg-pg-red px-7 py-3.5 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
        >
          Quero minha matéria →
        </Link>
      </div>
    </section>
  )
}
