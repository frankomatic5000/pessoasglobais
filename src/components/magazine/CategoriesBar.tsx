'use client'

import { useState } from 'react'

const CATEGORIES = ['Todas', 'Liderança', 'Negócios', 'Cultura', 'Diáspora', 'Tecnologia']

export function CategoriesBar() {
  const [active, setActive] = useState('Todas')

  return (
    <div className="border-b border-pg-border bg-pg-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`cursor-pointer whitespace-nowrap rounded-sm border-0 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
              active === cat
                ? 'bg-pg-red text-white'
                : 'bg-pg-tag text-pg-muted hover:bg-pg-red hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
