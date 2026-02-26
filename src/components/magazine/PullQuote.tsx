interface PullQuoteProps {
  quote: string
  author?: string
  authorTitle?: string
  variant?: 'inline' | 'full-width'
}

export function PullQuote({ quote, author, authorTitle, variant = 'full-width' }: PullQuoteProps) {
  if (variant === 'inline') {
    return (
      <blockquote className="my-6 border-l-[3px] border-pg-red py-1 pl-5">
        <p className="font-display text-[18px] italic leading-[1.6] text-pg-ink">
          &ldquo;{quote}&rdquo;
        </p>
        {author && (
          <cite className="mt-2 block font-mono text-[10px] uppercase not-italic tracking-[0.12em] text-pg-red">
            — {author}{authorTitle ? `, ${authorTitle}` : ''}
          </cite>
        )}
      </blockquote>
    )
  }

  return (
    <blockquote className="my-8 border-l-[4px] border-pg-red bg-[rgba(232,32,42,0.04)] px-10 py-6">
      <p className="font-display text-[1.75rem] font-normal italic leading-[1.4] text-pg-navy">
        &ldquo;{quote}&rdquo;
      </p>
      {author && (
        <cite className="mt-4 block font-mono text-[10px] uppercase not-italic tracking-[0.12em] text-pg-red">
          — {author}{authorTitle ? `, ${authorTitle}` : ''}
        </cite>
      )}
    </blockquote>
  )
}
