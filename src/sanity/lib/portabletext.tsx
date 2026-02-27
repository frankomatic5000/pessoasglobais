import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from './image'

export const articleBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 font-body text-[16px] leading-[1.85] text-pg-ink text-justify">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      // [column-span:all] makes this break out of the 2-col grid
      <blockquote className="[column-span:all] my-8 border-l-[4px] border-pg-red bg-[rgba(232,32,42,0.04)] px-10 py-6">
        <p className="font-display text-[1.75rem] font-normal italic leading-[1.4] text-pg-navy">
          {children}
        </p>
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="[column-span:all] mb-4 mt-10 font-display text-[1.5rem] font-bold text-pg-navy">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-display text-[1.15rem] font-bold text-pg-navy">
        {children}
      </h3>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-pg-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pg-navy-light underline transition-colors hover:text-pg-red"
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="[column-span:all] my-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
            <Image
              src={urlFor(value).width(1200).quality(80).url()}
              alt={value.caption ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 780px) 100vw, 780px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center font-body text-[13px] text-pg-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
