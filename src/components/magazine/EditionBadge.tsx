interface EditionBadgeProps {
  number: number | string
  theme?: string
  variant?: 'red' | 'navy'
}

export function EditionBadge({ number, theme, variant = 'red' }: EditionBadgeProps) {
  return (
    <span
      className={`inline-block rounded-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white ${
        variant === 'red' ? 'bg-pg-red' : 'bg-pg-navy'
      }`}
    >
      Edição #{number}{theme ? ` · ${theme}` : ''}
    </span>
  )
}
