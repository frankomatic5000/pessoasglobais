'use client'

import { useState } from 'react'
import type { Categoria } from '@/sanity/lib/queries'

interface CategoriesBarProps {
  categories: Categoria[]
}

export function CategoriesBar({ categories }: CategoriesBarProps) {
  const [active, setActive] = useState('todas')

  return (
    <div className="border-b border-pg-border bg-pg-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3">
        {/* "Todas" is always the first hardcoded tab */}
        <button
          key="todas"
          onClick={() => setActive('todas')}
          className={`cursor-pointer whitespace-nowrap rounded-sm border-0 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
            active === 'todas'
              ? 'bg-pg-red text-white'
              : 'bg-pg-tag text-pg-muted hover:bg-pg-red hover:text-white'
          }`}
        >
          Todas
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug.current}
            onClick={() => setActive(cat.slug.current)}
            className={`cursor-pointer whitespace-nowrap rounded-sm border-0 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
              active === cat.slug.current
                ? 'bg-pg-red text-white'
                : 'bg-pg-tag text-pg-muted hover:bg-pg-red hover:text-white'
            }`}
          >
            {cat.nome}
          </button>
        ))}
      </div>
    </div>
  )
}
