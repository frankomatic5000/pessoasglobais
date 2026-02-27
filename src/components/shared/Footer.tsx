import Link from 'next/link'

export function Footer() {
  return (
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
          <Link href="/sobre" className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red">
            Sobre
          </Link>
          <Link href="/edicoes" className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red">
            Edições
          </Link>
          <Link href="/tenha-sua-materia" className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red">
            Tenha sua Matéria
          </Link>
          <a
            href="https://growbiz.media"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted no-underline transition-colors hover:text-pg-red"
          >
            GrowBiz Media ↗
          </a>
        </div>
        <p className="font-mono text-[10px] text-pg-muted">© 2026 Pessoas Globais</p>
      </div>
    </footer>
  )
}
