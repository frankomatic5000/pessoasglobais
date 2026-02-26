'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'PT' | 'EN'>('PT')

  return (
    <nav className="sticky top-0 z-50 w-full bg-pg-navy shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="no-underline">
          <Image
            src="/logo.jpeg"
            alt="Pessoas Globais"
            width={120}
            height={40}
            className="rounded-sm object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/edicoes" className="font-body text-xs font-medium uppercase tracking-[0.1em] text-white/75 no-underline transition-colors hover:text-pg-red">
            Edições
          </Link>
          <Link href="/categorias" className="font-body text-xs font-medium uppercase tracking-[0.1em] text-white/75 no-underline transition-colors hover:text-pg-red">
            Categorias
          </Link>
          <Link href="/sobre" className="font-body text-xs font-medium uppercase tracking-[0.1em] text-white/75 no-underline transition-colors hover:text-pg-red">
            Sobre
          </Link>
          <Link
            href="/tenha-sua-materia"
            className="rounded-sm bg-pg-red px-[18px] py-2 font-body text-xs font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-pg-red-dark"
          >
            Tenha sua Matéria
          </Link>

          {/* Lang switcher */}
          <div className="flex items-center gap-1.5 rounded-sm border border-white/20 px-2.5 py-1.5">
            <button
              onClick={() => setLang('PT')}
              className={`cursor-pointer border-none bg-transparent font-mono text-[0.7rem] font-semibold tracking-[0.08em] ${lang === 'PT' ? 'text-white' : 'text-white/40'}`}
            >
              PT
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLang('EN')}
              className={`cursor-pointer border-none bg-transparent font-mono text-[0.7rem] font-semibold tracking-[0.08em] ${lang === 'EN' ? 'text-white' : 'text-white/40'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded p-2 text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-pg-navy-dark px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/edicoes" className="font-body text-xs font-medium uppercase tracking-[0.1em] text-white/75 no-underline">Edições</Link>
            <Link href="/categorias" className="font-body text-xs font-medium uppercase tracking-[0.1em] text-white/75 no-underline">Categorias</Link>
            <Link href="/sobre" className="font-body text-xs font-medium uppercase tracking-[0.1em] text-white/75 no-underline">Sobre</Link>
            <Link
              href="/tenha-sua-materia"
              className="w-fit rounded-sm bg-pg-red px-[18px] py-2 font-body text-xs font-semibold uppercase tracking-[0.08em] text-white no-underline"
            >
              Tenha sua Matéria
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
