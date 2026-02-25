# CLAUDE.md — pessoasglobais.com

> Read by Claude Code at the start of every session.
> Full design system and product spec in SPEC.md.

---

## What This Project Is

Standalone premium digital magazine at `pessoasglobais.com`.  
Part of GrowBiz Media (`growbiz.media`) — independent repo and domain.  
Editorial style: Exame / Forbes Brazil. Organized by numbered **Edições**.  
**PT-BR primary · EN secondary.**

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Sanity v3 · Vercel

---

## Brand Colors — EXACT VALUES

```
Primary:
  --pg-red:        #E8202A   ← CTAs, category labels, pull quote borders, highlights
  --pg-red-dark:   #C41820   ← Hover / pressed
  --pg-red-light:  #FF4D55   ← Active links

Secondary:
  --pg-navy:       #1E3560   ← Navbar bg, article header bg, edition badges
  --pg-navy-dark:  #152545   ← Hover / pressed
  --pg-navy-light: #2D4F8A   ← Inline text links

Neutrals:
  --pg-ink:        #0F0F0F   ← Body text
  --pg-paper:      #FAFAFA   ← Page background
  --pg-surface:    #FFFFFF   ← Cards, panels
  --pg-muted:      #6B6B6B   ← Captions, metadata
  --pg-border:     #E5E5E5   ← Dividers, card borders
  --pg-tag:        #F2F2F2   ← Category tag backgrounds
  --pg-highlight:  #FFF2F2   ← HighlightsBox background
```

**Never hardcode hex. Always use `bg-pg-red`, `text-pg-navy`, etc.**

---

## Fonts

```typescript
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
// Playfair Display → font-display  (headings, pull quotes, drop caps)
// DM Sans         → font-body     (UI, body text, deck)
// DM Mono         → font-mono     (labels, badges, metadata — always uppercase)
```

---

## Component Map (SPEC.md §5)

| Component | File | Key visual rule |
|---|---|---|
| `Navbar` | `layout/Navbar.tsx` | bg-pg-navy · "Globais" in pg-red · sticky |
| `EditionStrip` | `magazine/EditionStrip.tsx` | Active chip = bg-pg-red |
| `ArticleCard` | `magazine/ArticleCard.tsx` | Title hover = pg-red · image scale on hover |
| `EditionBadge` | `magazine/EditionBadge.tsx` | bg-pg-red · white · DM Mono uppercase |
| `CategoryTag` | `magazine/CategoryTag.tsx` | bg-pg-tag → hover bg-pg-red |
| `HighlightsBox` | `magazine/HighlightsBox.tsx` | border-left 3px pg-red · bg #FFF2F2 |
| `PullQuote` | `magazine/PullQuote.tsx` | border-left 4px pg-red · Playfair italic |
| `MiniBio` | `magazine/MiniBio.tsx` | border-top 2px pg-red · bg-pg-tag · photo border pg-red |
| `ShareButtons` | `magazine/ShareButtons.tsx` | Hover bg-pg-red |
| `NewsletterSignup` | `magazine/NewsletterSignup.tsx` | Button bg-pg-red |
| `CTABanner` | `magazine/CTABanner.tsx` | bg-pg-navy · button bg-pg-red |
| `WhatsAppFloat` | `shared/WhatsAppFloat.tsx` | Fixed br · #25D366 |
| `Button` | `shared/Button.tsx` | primary=pg-red · secondary=pg-navy |

---

## Article Template Key Rules (SPEC.md §7)

- Header: `bg-pg-navy` white text
- Body: 2-col desktop (`md:grid-cols-2`) · 1-col mobile · max-width 680px
- Drop cap: Playfair Display · 3.5em · pg-red · float left
- HighlightsBox: above body · `border-l-[3px] border-pg-red bg-pg-highlight`
- PullQuote full-width: `border-l-[4px] border-pg-red` · Playfair italic 28px
- MiniBio: `border-t-2 border-pg-red bg-pg-tag`
- CTA banner: `bg-pg-navy` always below mini bio

---

## Routing

```
/                              Homepage
/edicoes                       All editions archive
/edicoes/[edicao]             Single edition
/edicoes/[edicao]/[slug]      Article
/categorias/[categoria]        Category feed
/tenha-sua-materia            Lead capture
/sobre                         About
```

---

## Sanity CMS

3 document types: `article` · `edicao` · `pessoa`  
Client: `src/lib/sanity/client.ts`  
Images: `urlFor(img).width(N).quality(80).url()`  
GROQ:
```typescript
// Homepage featured article
`*[_type=="article" && featured==true && idioma=="pt-BR"][0]{..., edicao->, entrevistado->}`

// Edition articles
`*[_type=="article" && edicao->slug.current==$edicao && idioma=="pt-BR"] | order(dataPublicacao desc)`
```

---

## Rules — Never Violate

- ❌ `export default` for components
- ❌ Hex values in JSX — always Tailwind `pg-*` tokens
- ❌ `<img>` tags — always `next/image`
- ❌ Google Fonts `<link>` — always `next/font`
- ❌ `'use client'` for data fetching
- ❌ Push directly to `main`
- ❌ More than 1 `featured: true` per edition
- ❌ Inline styles

---

## Git

```
main ← production  |  staging ← pre-prod  |  feature/* ← all work
```
Commits: `feat:` `fix:` `content:` `style:` `chore:` `docs:`

---

*Claude Code reads this file at the start of every session. Keep updated.*
