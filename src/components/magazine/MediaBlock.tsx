'use client'

import { useState } from 'react'

export function MediaBlock() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="bg-pg-navy py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Pull Quote */}
          <div>
            <span className="mb-6 inline-block rounded-sm bg-pg-red/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-pg-red-light">
              Citação da Edição
            </span>
            <blockquote className="mb-6 border-l-4 border-pg-red pl-6 font-display text-3xl font-bold italic leading-[1.15] text-white md:text-4xl lg:text-5xl">
              &ldquo;A verdadeira revolução não é tecnológica — é humana.&rdquo;
            </blockquote>
            <p className="font-body text-base text-white/60">
              — Carolina Vasconcelos, <span className="italic">Conexões Invisíveis</span>, 2026
            </p>
          </div>

          {/* Podcast Player */}
          <div className="rounded-sm border border-white/10 bg-pg-navy-dark p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-pg-red" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/60">
                Podcast Ao Vivo
              </span>
            </div>

            <h3 className="mb-1 font-display text-xl font-bold text-white">
              Ep. 42 — Empatia Digital
            </h3>
            <p className="mb-6 font-body text-sm text-white/60">
              com Carolina Vasconcelos · 48 min
            </p>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[35%] rounded-full bg-pg-red transition-all" />
              </div>
              <div className="mt-1 flex justify-between">
                <span className="font-mono text-xs text-white/40">16:48</span>
                <span className="font-mono text-xs text-white/40">48:12</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              {/* Skip Back */}
              <button
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Anterior"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-pg-red text-white shadow-lg transition-colors hover:bg-pg-red-dark"
                aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip Forward */}
              <button
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Próximo"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zm2-8.14 5.02 3.64L8 17.14V9.86zM16 6h2v12h-2z" />
                </svg>
              </button>

              {/* Volume */}
              <button
                className="ml-4 text-white/50 transition-colors hover:text-white"
                aria-label="Volume"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
