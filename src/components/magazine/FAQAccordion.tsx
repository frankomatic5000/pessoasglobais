'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Quanto custa ter minha matéria na Pessoas Globais?',
    a: 'O investimento inclui produção editorial completa, sessão fotográfica, edição e distribuição digital. Após a análise do seu perfil, entraremos em contato com uma proposta personalizada.',
  },
  {
    q: 'Como funciona o processo editorial?',
    a: 'Após o contato inicial, realizamos uma entrevista aprofundada (presencial ou remota), produção fotográfica editorial e um processo de revisão colaborativo. Do primeiro contato à publicação, o processo leva entre 4 e 8 semanas.',
  },
  {
    q: 'Em quantos idiomas é publicado?',
    a: 'Publicamos em PT-BR como idioma principal, com versão em inglês para distribuição internacional no mesmo número da edição.',
  },
  {
    q: 'Qual é o prazo para publicação?',
    a: 'Publicamos por edições temáticas, cada uma com até 8 matérias. As vagas são limitadas. Candidaturas aprovadas entram na fila para a próxima edição disponível.',
  },
]

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => (
        <div key={i} className="overflow-hidden rounded-sm border border-pg-border">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left font-body text-[15px] font-medium text-pg-navy transition-colors hover:text-pg-red"
          >
            {faq.q}
            <span
              className={`ml-4 shrink-0 font-mono text-[10px] transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            >
              ↓
            </span>
          </button>
          {open === i && (
            <div className="border-t border-pg-border bg-pg-tag px-6 py-4">
              <p className="font-body text-[15px] leading-[1.6] text-pg-muted">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
