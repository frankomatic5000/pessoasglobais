interface MiniBioProps {
  name: string
  title: string
  bio: string
  instagram?: string
  edition?: string
}

export function MiniBio({ name, title, bio, instagram, edition }: MiniBioProps) {
  return (
    <div className="rounded-sm border-t-2 border-pg-red bg-pg-tag p-6">
      <div className="flex items-start gap-5">
        {/* Avatar placeholder — swap with next/image when Sanity is wired */}
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-pg-red bg-pg-navy">
          <span className="font-display text-2xl font-bold text-white">{name[0]}</span>
        </div>

        <div className="min-w-0">
          <p className="mb-0.5 font-display text-[15px] font-bold text-pg-navy">{name}</p>
          <p className="mb-2 font-body text-[13px] font-medium text-pg-red">{title}</p>
          <p className="font-body text-[13px] leading-[1.5] text-pg-muted line-clamp-2">{bio}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {instagram && (
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pg-muted transition-colors hover:text-pg-red cursor-pointer">
                @{instagram}
              </span>
            )}
            {edition && (
              <span className="rounded-sm bg-pg-navy px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
                {edition}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
