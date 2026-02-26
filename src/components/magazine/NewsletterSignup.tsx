'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="border-b border-t border-pg-border bg-[#F5F5F5] px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <h2 className="mb-1 font-display text-[1.75rem] font-bold leading-tight text-pg-navy">
            Receba cada nova edição
          </h2>
          <p className="font-body text-[15px] text-pg-muted">
            Histórias direto no seu email.
          </p>
        </div>

        {submitted ? (
          <p className="font-body text-[15px] font-medium text-pg-navy">
            ✓ Inscrito com sucesso!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full border border-r-0 border-pg-border bg-white px-4 font-body text-[15px] text-pg-ink outline-none focus:border-pg-navy md:w-72"
            />
            <button
              type="submit"
              className="h-12 whitespace-nowrap bg-pg-red px-6 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-pg-red-dark"
            >
              Assinar
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
