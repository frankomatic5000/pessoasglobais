'use client'

import { useState } from 'react'

const AREAS = ['Tecnologia', 'Moda & Design', 'Gastronomia', 'Serviços', 'Educação', 'Saúde', 'Finanças', 'Outra']
const HOW = ['Instagram', 'Indicação de alguém', 'Google', 'LinkedIn', 'Podcast', 'Outro']

const INPUT = 'h-12 w-full border border-pg-border bg-white px-4 font-body text-[15px] text-pg-ink outline-none transition-colors focus:border-pg-navy rounded-sm'
const SELECT = `${INPUT} cursor-pointer`
const LABEL = 'mb-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-pg-muted'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (formspreeId) {
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
    } else {
      await new Promise((r) => setTimeout(r, 900))
    }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-5xl">✓</div>
        <h3 className="mb-2 font-display text-[2rem] font-bold text-pg-navy">
          Recebemos sua candidatura!
        </h3>
        <p className="font-body text-[17px] text-pg-muted">
          Nossa equipe entrará em contato em até 48 horas úteis.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Nome completo *</label>
          <input name="nome" type="text" required placeholder="Seu nome" className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>E-mail *</label>
          <input name="email" type="email" required placeholder="seu@email.com" className={INPUT} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>WhatsApp (com DDI) *</label>
          <input name="whatsapp" type="tel" required placeholder="+55 11 99999-9999" className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Empresa</label>
          <input name="empresa" type="text" placeholder="Nome da sua empresa" className={INPUT} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Cargo</label>
          <input name="cargo" type="text" placeholder="Ex: CEO, Fundadora, Diretora" className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Área de atuação *</label>
          <select name="area" required className={SELECT}>
            <option value="">Selecione...</option>
            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL}>Sua história *</label>
        <textarea
          name="historia"
          required
          rows={5}
          placeholder="Conte-nos brevemente sua trajetória e por que acredita que ela deveria ser contada na Pessoas Globais."
          className="w-full resize-none rounded-sm border border-pg-border bg-white px-4 py-3 font-body text-[15px] text-pg-ink outline-none transition-colors focus:border-pg-navy"
        />
      </div>

      <div>
        <label className={LABEL}>Como nos conheceu?</label>
        <select name="como_conheceu" className={SELECT}>
          <option value="">Selecione...</option>
          {HOW.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-pg-red px-8 py-4 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-pg-red-dark disabled:opacity-60 sm:w-auto"
        >
          {loading ? 'Enviando...' : 'Enviar candidatura →'}
        </button>
        {waNumber && (
          <p className="mt-3 font-mono text-[10px] text-pg-muted">
            Ou fale diretamente:{' '}
            <a
              href={`https://wa.me/${waNumber}?text=Ol%C3%A1!%20Tenho%20interesse%20em%20ter%20minha%20mat%C3%A9ria%20na%20Pessoas%20Globais.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pg-red no-underline hover:underline"
            >
              WhatsApp ↗
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
