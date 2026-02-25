# pessoasglobais.com — Design & Product Specification
**Version:** 2.0  
**Last Updated:** February 2026  
**Status:** Active Development — Phase 1 Priority  
**Repo:** `github.com/[org]/pessoasglobais`  
**Design Tool:** Figma

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Brand Identity](#2-brand-identity)
3. [Design Tokens](#3-design-tokens)
4. [Typography System](#4-typography-system)
5. [Component Library](#5-component-library)
6. [Page Specifications](#6-page-specifications)
7. [Article Template Anatomy](#7-article-template-anatomy)
8. [Site Architecture](#8-site-architecture)
9. [CMS Schema — Sanity](#9-cms-schema--sanity)
10. [Internationalization](#10-internationalization)
11. [SEO Requirements](#11-seo-requirements)
12. [Landing Page — "Tenha sua Matéria"](#12-landing-page--tenha-sua-matéria)
13. [GitHub Branching Strategy](#13-github-branching-strategy)
14. [CI/CD Deployment](#14-cicd-deployment)
15. [Component Naming Conventions](#15-component-naming-conventions)
16. [Content Guidelines for Editors](#16-content-guidelines-for-editors)
17. [Performance Budgets](#17-performance-budgets)
18. [Package Dependencies](#18-package-dependencies)

---

## 1. Project Overview

**Domain:** `pessoasglobais.com`  
**Type:** Standalone premium digital magazine  
**Parent brand:** GrowBiz Media (`growbiz.media`)  
**Tagline:** "A revista dos empreendedores globais"  
**Primary language:** PT-BR · **Secondary:** EN  
**Audience:** Multicultural founders, diaspora leaders, global thinkers  
**Editorial model:** Organized by numbered **Edições** (editions), each with a central theme  
**Revenue path:** "Tenha sua Matéria" paid editorial placements + newsletter sponsorships

---

## 2. Brand Identity

### Logo

```
Full wordmark:  "Pessoas" (navy) + "Globais" (red) + PG icon
PG Icon:        Red arc (P shape) + Navy circle dot (inside)
                — reads as a globe / person in motion
```

### Logo Files (export from Figma as SVG)

| File | Format | Usage |
|---|---|---|
| `pessoas-globais-full.svg` | Full wordmark — horizontal | Navbar, footer, article headers |
| `pessoas-globais-icon.svg` | Icon only (arc + dot) | Favicon, social avatar, edition seal |
| `pessoas-globais-dark.svg` | Full wordmark — white on dark | Dark backgrounds only |

### Brand Personality

- **Editorial** — serious, authoritative, journalistic
- **Warm** — human stories, not corporate content
- **Global** — multicultural, bilingual, diaspora-aware
- **Premium** — never cheap or generic

---

## 3. Design Tokens

> These tokens must be created as **Figma Variables** before any component design begins.
> In code they map to CSS custom properties and Tailwind color extensions.

### Color Tokens

```
┌─────────────────────────────────────────────────────────────────┐
│  BRAND PRIMITIVES  (source of truth — from official logo)       │
├──────────────────────┬──────────────────────────────────────────┤
│  Token               │  Hex        │  Name / Role               │
├──────────────────────┼─────────────┼────────────────────────────┤
│  brand-red           │  #E8202A    │  Primary — icon, "Globais" │
│  brand-red-dark      │  #C41820    │  Hover / pressed           │
│  brand-red-light     │  #FF4D55    │  Active links              │
│  brand-navy          │  #1E3560    │  Secondary — "Pessoas"     │
│  brand-navy-dark     │  #152545    │  Hover / pressed           │
│  brand-navy-light    │  #2D4F8A    │  Links, accents            │
├──────────────────────┴─────────────┴────────────────────────────┤
│  SEMANTIC TOKENS  (reference the primitives above)              │
├──────────────────────┬──────────────────────────────────────────┤
│  color-primary       │  → brand-red       │  CTAs, highlights   │
│  color-primary-hover │  → brand-red-dark  │  Button hover state │
│  color-secondary     │  → brand-navy      │  Headers, navbar    │
│  color-link          │  → brand-navy-light│  Inline text links  │
│  color-accent        │  → brand-red       │  Borders, dividers  │
├──────────────────────┴────────────────────────────────────────  │
│  NEUTRAL TOKENS                                                  │
├──────────────────────┬──────────────────────────────────────────┤
│  color-ink           │  #0F0F0F    │  Body text                 │
│  color-paper         │  #FAFAFA    │  Page background           │
│  color-surface       │  #FFFFFF    │  Card / panel bg           │
│  color-muted         │  #6B6B6B    │  Captions, metadata        │
│  color-border        │  #E5E5E5    │  Dividers, card borders    │
│  color-tag-bg        │  #F2F2F2    │  Category tag backgrounds  │
│  color-highlight-bg  │  #FFF2F2    │  Highlights box tint       │
└──────────────────────┴─────────────────────────────────────────┘
```

### CSS Variables (`src/app/globals.css`)

```css
:root {
  /* Brand primitives */
  --pg-red:           #E8202A;
  --pg-red-dark:      #C41820;
  --pg-red-light:     #FF4D55;
  --pg-navy:          #1E3560;
  --pg-navy-dark:     #152545;
  --pg-navy-light:    #2D4F8A;

  /* Neutrals */
  --pg-ink:           #0F0F0F;
  --pg-paper:         #FAFAFA;
  --pg-surface:       #FFFFFF;
  --pg-muted:         #6B6B6B;
  --pg-border:        #E5E5E5;
  --pg-tag:           #F2F2F2;
  --pg-highlight-bg:  #FFF2F2;
}
```

### Tailwind Extension (`tailwind.config.ts`)

```typescript
colors: {
  pg: {
    red:           '#E8202A',
    'red-dark':    '#C41820',
    'red-light':   '#FF4D55',
    navy:          '#1E3560',
    'navy-dark':   '#152545',
    'navy-light':  '#2D4F8A',
    ink:           '#0F0F0F',
    paper:         '#FAFAFA',
    surface:       '#FFFFFF',
    muted:         '#6B6B6B',
    border:        '#E5E5E5',
    tag:           '#F2F2F2',
    highlight:     '#FFF2F2',
  }
}
```

---

## 4. Typography System

> Set up as **Figma Text Styles** using these exact values.

### Font Families

| Role | Font | Fallback | Load via |
|---|---|---|---|
| Display / Headings | **Playfair Display** | Georgia, serif | `next/font/google` |
| Body / UI | **DM Sans** | system-ui, sans-serif | `next/font/google` |
| Labels / Mono | **DM Mono** | monospace | `next/font/google` |

### Type Scale

| Style Name | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `display-xl` | Playfair Display | 72px | 900 | 1.0 | -0.03em | Edition cover titles |
| `display-lg` | Playfair Display | 52px | 900 | 1.05 | -0.02em | Hero article title |
| `display-md` | Playfair Display | 38px | 700 | 1.1 | -0.02em | Article page title |
| `display-sm` | Playfair Display | 28px | 700 | 1.2 | -0.01em | Section headings |
| `body-deck` | DM Sans | 20px | 300 | 1.65 | 0 | Linha fina / article deck |
| `body-lg` | DM Sans | 17px | 400 | 1.85 | 0 | Article body text |
| `body-md` | DM Sans | 15px | 400 | 1.6 | 0 | Card descriptions, UI text |
| `body-sm` | DM Sans | 13px | 400 | 1.5 | 0 | Captions, bylines |
| `label-lg` | DM Mono | 11px | 500 | 1.2 | 0.15em | Category tags (uppercase) |
| `label-sm` | DM Mono | 10px | 400 | 1.2 | 0.12em | Edition badges, meta |
| `pull-quote` | Playfair Display | 22px | 400 italic | 1.6 | 0 | Pull quote text |
| `mini-bio-name` | Playfair Display | 15px | 700 | 1.3 | 0 | Mini bio name |

### Body Text Max Width

Article body text is always constrained to **`max-width: 680px`** on desktop.  
Never allow body text to span full viewport width.

---

## 5. Component Library

> Each component below must be created as a **Figma Component** with variants.
> Component names map directly to React component file names in code.

---

### 5.1 `Navbar`

**States:** Default · Scrolled (elevated shadow)  
**Mobile:** Hamburger menu at `< 768px`

```
┌─────────────────────────────────────────────────────────────────┐
│ bg: pg-navy                                height: 64px sticky  │
│                                                                  │
│  [PG Icon] Pessoas Globais   Edições  Categorias  Sobre  [CTA]  │
│                                                         [PT|EN] │
└─────────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Background | `pg-navy` |
| Logo icon | SVG 36×36px |
| Logo text | "Pessoas" white / "Globais" `pg-red` · Playfair Display |
| Nav links | DM Sans 12px · weight 500 · uppercase · letter-spacing 0.1em · white 75% opacity |
| Nav link hover | `pg-red` |
| CTA button | `pg-red` bg · white text · 2px radius · padding 8px 18px |
| Lang switcher | Border 1px white 20% · PT active = white · EN inactive = white 50% |
| Height | 64px |
| Position | Sticky top-0 z-100 |

---

### 5.2 `EditionStrip`

Horizontal scrolling row of edition chips.

```
bg: #F5F5F5   border-bottom: 1px pg-border   padding: 10px 40px
[ #1 Fevereiro 2026 ★ ]  [ #2 Março 2026 ]  [ #3 Em breve ]
```

| State | Spec |
|---|---|
| Default chip | white bg · pg-border border · pg-muted text · 2px radius |
| Active chip | `pg-red` bg · white text |
| Hover chip | pg-navy border · pg-navy text |
| Number | DM Mono · label-sm |
| Label | DM Sans · body-sm |

---

### 5.3 `ArticleCard`

**Variants:** `default` · `featured` · `compact`

```
┌───────────────────────────┐
│  IMAGE (4:3 ratio)        │
│  [Category Tag]           │  ← positioned bottom-left of image
├───────────────────────────┤
│  CATEGORY LABEL           │  DM Mono label-lg · pg-red · uppercase
│  Article Title            │  Playfair Display display-sm
│  Deck text                │  DM Sans body-md · pg-muted
├───────────────────────────┤
│  Author name   [Ed. #1]   │  DM Mono label-sm · border-top pg-border
└───────────────────────────┘
```

| Element | Spec |
|---|---|
| Image | `aspect-ratio: 4/3` · `object-fit: cover` · overflow hidden |
| Image hover | `transform: scale(1.04)` transition 400ms |
| Category | DM Mono · 11px · pg-red · uppercase · letter-spacing 0.15em |
| Title | Playfair Display · display-sm · pg-navy |
| Title hover | `pg-red` |
| Deck | DM Sans · body-md · pg-muted |
| Meta row | DM Mono · label-sm · border-top 1px pg-border · pt-12px |
| Edition badge | `pg-navy` bg · white text · label-sm |

---

### 5.4 `EditionBadge`

```
[ Edição #1 · Liderança ]
bg: pg-red · white · DM Mono · label-sm · uppercase · letter-spacing 0.1em · padding 5px 10px
```

---

### 5.5 `CategoryTag`

```
[ Liderança ]
bg: pg-tag · pg-muted text · DM Mono · label-lg · uppercase · padding 4px 8px · 2px radius
Hover: bg pg-red · white text
Active: bg pg-red · white text
```

---

### 5.6 `HighlightsBox`

```
┌─ 3px solid pg-red ────────────────────────────────────────────┐
│  DESTAQUES DESTA MATÉRIA           DM Mono label-sm uppercase  │
│                                                                │
│  → Highlight bullet one                                       │
│  → Highlight bullet two                                       │
│  → Highlight bullet three                                     │
└────────────────────────────────────────────────────────────────┘
bg: pg-highlight (#FFF2F2)   padding: 24px 32px
```

| Element | Spec |
|---|---|
| Container | `background: #FFF2F2` · `border-left: 3px solid pg-red` · padding 24px 32px |
| Label | DM Mono · label-sm · pg-red · uppercase · letter-spacing 0.15em · mb-16px |
| Arrow icon | `→` · pg-red · font-weight 700 |
| Bullet text | DM Sans · body-sm · pg-ink · line-height 1.5 |

---

### 5.7 `PullQuote`

**Variants:** `inline` (inside column) · `full-width` (between columns)

**Inline:**
```
│ (3px solid pg-red left border)
│ "Quote text in Playfair italic 18px pg-ink"
│
│ — Name, Title    DM Mono label-sm pg-red
```

**Full-width:**
```
┌─ 4px solid pg-red ─────────────────────────────────────────────┐
│                                                                 │
│  "Quote text in Playfair Display italic 28px pg-navy"          │
│                                                                 │
│  — Name, Title    DM Mono label-sm pg-red                      │
└─────────────────────────────────────────────────────────────────┘
bg: rgba(232,32,42,0.04)   padding: 24px 40px
```

---

### 5.8 `MiniBio`

```
┌── border-top 2px pg-red ───────────────────────────────────────┐
│  [Photo 72px circle]  Name          Playfair Display mini-bio  │
│  bg: pg-tag           Title         DM Sans · pg-red · 13px    │
│                       Bio text      DM Sans · body-sm          │
│                       @instagram  [Edição #1 · Fev 2026]       │
└─────────────────────────────────────────────────────────────────┘
bg: pg-tag   border-radius: 2px   padding: 24px   gap: 20px
```

| Element | Spec |
|---|---|
| Photo | 72×72px · border-radius 50% · `border: 2px solid pg-red` |
| Name | Playfair Display · mini-bio-name (15px 700) · pg-navy |
| Title | DM Sans · 13px · pg-red · weight 500 |
| Bio text | DM Sans · body-sm · pg-muted · max 2 lines |
| Social handle | DM Mono · label-sm · pg-muted · hover pg-red |
| Edition seal | `pg-navy` bg · white · DM Mono · label-sm · hover pg-red bg |

---

### 5.9 `ShareButtons`

Row of 4 icon buttons: WhatsApp · LinkedIn · X · Copy link

```
Button: 32×32px · border 1px white 20% (on dark) · border-radius 2px
Icon:   14×14px SVG
Hover:  bg pg-red · border pg-red · white icon
```

---

### 5.10 `NewsletterSignup`

**Variants:** `band` (full-width) · `inline` (article sidebar/end)

```
bg: #F5F5F5   border-top/bottom: 1px pg-border   padding: 48px 40px

  Receba cada nova edição              Histórias direto no seu email.
  [Email input field              ] [Assinar]
```

| Element | Spec |
|---|---|
| Title | Playfair Display · display-sm · pg-navy |
| Input | height 48px · border 1px pg-border · border-right: none · DM Sans · body-md |
| Input focus | border-color pg-navy |
| Button | `pg-red` bg · white · DM Sans · 13px · weight 600 · uppercase · hover pg-red-dark |

---

### 5.11 `CTABanner`

Full-width section linking to `/tenha-sua-materia`.

```
┌─────────────────────────────────────────────────────────────────┐
│  bg: pg-navy                         padding: 64px 40px center  │
│                                                                  │
│  PESSOAS GLOBAIS · TENHA SUA MATÉRIA       DM Mono label-sm red │
│                                                                  │
│  Sua história merece ser                   Playfair Display      │
│  contada ao mundo.                         display-lg white      │
│                                                                  │
│  Seja a próxima voz da Pessoas Globais.    DM Sans white 60%     │
│                                                                  │
│  [ Quero minha matéria →  ]                pg-red btn            │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5.12 `WhatsAppFloat`

```
Fixed: bottom-right, z-200, bottom 32px, right 32px
Size:  52×52px circle
Color: #25D366 bg · white icon
Shadow: 0 4px 20px rgba(37,211,102,0.4)
Hover: translateY(-2px) · stronger shadow
```

---

### 5.13 `Button`

**Variants:** `primary` · `secondary` · `ghost` · `outline`

| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `pg-red` | white | none |
| `secondary` | `pg-navy` | white | none |
| `ghost` | transparent | `pg-red` | 1px `pg-red` |
| `outline` | transparent | `pg-navy` | 1px `pg-navy` |

All variants: padding 14px 28px · DM Sans 13px · weight 600 · uppercase · letter-spacing 0.08em · border-radius 2px · transition 200ms

Hover: darken bg by 10% (`pg-red-dark` / `pg-navy-dark`)

---

## 6. Page Specifications

### 6.1 Magazine Homepage (`/`)

**Figma frame:** Desktop 1440px · Mobile 375px

| # | Section | Component(s) | Notes |
|---|---|---|---|
| 1 | Navbar | `Navbar` | Sticky |
| 2 | Edition Strip | `EditionStrip` | Below navbar |
| 3 | Hero — Featured Article | `ArticleHero` | Full-width 2-col · image left · content right |
| 4 | Categories Bar | `CategoryTab` × 6 | Liderança / Negócios / Cultura / Diáspora / Tecnologia / Todas |
| 5 | Article Grid | `ArticleCard` × 9 | 3-col desktop / 2-col tablet / 1-col mobile |
| 6 | Newsletter | `NewsletterSignup` (band) | Brevo embed |
| 7 | CTA Banner | `CTABanner` | → `/tenha-sua-materia` |
| 8 | Footer | `Footer` | Links back to growbiz.media |
| — | WhatsApp | `WhatsAppFloat` | Fixed on all pages |

### Hero Layout

```
Desktop (1440px):
┌──────────────────────────────────────────────────────────────────┐
│  LEFT HALF (image)          │  RIGHT HALF (content)             │
│  - Full bleed photo         │  - pg-red vertical bar left edge  │
│  - Edition badge overlay    │  - Category · Title · Deck        │
│  - Flag icons               │  - Byline row                     │
│  - Gradient fade →right     │  - HighlightsBox                  │
│                             │  - "Ler matéria completa" button  │
└──────────────────────────────────────────────────────────────────┘

Mobile (375px):
Image stacks above content — full-width
```

---

### 6.2 Edition Page (`/edicoes/[edicao]`)

| # | Section | Notes |
|---|---|---|
| 1 | Edition Header | Number, theme, date, editorial note (2–3 sentences) |
| 2 | Cover Story | Featured article full-width card |
| 3 | Articles Grid | All articles in this edition |
| 4 | Edition Navigation | ← Previous / Next → |
| 5 | All Editions Archive | Compact list |

---

### 6.3 Article Page (`/edicoes/[edicao]/[slug]`)

See [Section 7 — Article Template Anatomy](#7-article-template-anatomy).

---

### 6.4 Category Page (`/categorias/[categoria]`)

| # | Section | Notes |
|---|---|---|
| 1 | Category Header | Name · description · article count |
| 2 | Article Grid | Filtered, same layout as homepage |
| 3 | Other Categories | Links to remaining 4 categories |

---

### 6.5 About (`/sobre`)

| # | Section |
|---|---|
| 1 | Mission statement |
| 2 | Editorial team — photo, name, bio |
| 3 | GrowBiz Media attribution + link |
| 4 | CTA → Tenha sua Matéria |

---

## 7. Article Template Anatomy

**Figma frame:** Desktop 1440px · Tablet 768px · Mobile 375px

```
┌──────────────────────────────────────────────────────────────────┐
│  NAVBAR  bg:pg-navy  sticky                                      │
├──────────────────────────────────────────────────────────────────┤
│  ARTICLE HEADER  bg:pg-navy  padding: 64px 40px 48px            │
│  max-width: 780px  centered                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  [Ed. #1 · Fevereiro 2026]  [Liderança]                │    │
│  │  ← EditionBadge             ← CategoryTag              │    │
│  │                                                         │    │
│  │  Article Title                                          │    │
│  │  Playfair Display · display-lg · white                  │    │
│  │                                                         │    │
│  │  Linha fina / deck                                      │    │
│  │  DM Sans · body-deck · white 70% · italic               │    │
│  │                                                         │    │
│  │  ─────────────────────────────────────────────────     │    │
│  │  [Avatar] Por Autor · Data · X min de leitura           │    │
│  │                               [WA][LI][X][Copy]         │    │
│  └─────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│  COVER IMAGE  full-width  aspect-ratio: 16/7  next/image        │
│  Caption: absolute bottom · DM Sans body-sm · white 70%         │
├──────────────────────────────────────────────────────────────────┤
│  ARTICLE BODY  max-width: 780px  centered  padding: 48px 40px   │
│                                                                  │
│  HighlightsBox                                                   │
│  (3px left border pg-red · bg #FFF2F2)                          │
│                                                                  │
│  ┌────────────────────────┬────────────────────────────────┐    │
│  │  COLUMN 1              │  COLUMN 2                      │    │
│  │  Source Serif / DM Sans│  340px each  gap: 48px         │    │
│  │  16–17px  line-h 1.85  │                                │    │
│  │  text-align: justify   │                                │    │
│  │                        │                                │    │
│  │  Drop cap on ¶1        │  Inline PullQuote if needed    │    │
│  │  (Playfair 3.5em red)  │                                │    │
│  └────────────────────────┴────────────────────────────────┘    │
│                                                                  │
│  PullQuote full-width                                            │
│  (4px left border pg-red · bg rgba(232,32,42,0.04))            │
│                                                                  │
│  ┌────────────────────────┬────────────────────────────────┐    │
│  │  COLUMN 1 continued    │  COLUMN 2 continued            │    │
│  └────────────────────────┴────────────────────────────────┘    │
│                                                                  │
│  MiniBio                                                         │
│  (border-top 2px pg-red · bg pg-tag)                            │
├──────────────────────────────────────────────────────────────────┤
│  CTABanner  bg:pg-navy                                           │
├──────────────────────────────────────────────────────────────────┤
│  Related Articles  3 × ArticleCard                               │
├──────────────────────────────────────────────────────────────────┤
│  NewsletterSignup (band)                                         │
├──────────────────────────────────────────────────────────────────┤
│  Footer                                                          │
└──────────────────────────────────────────────────────────────────┘
```

**Responsive rules:**
- 2-col body → 1-col at `md` (768px)
- PullQuote full-width always
- Article header max-width 780px centered
- Body text max-width 680px inside columns

---

## 8. Site Architecture

```
pessoasglobais/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root — fonts, GA4, navbar
│   │   ├── page.tsx                            # Homepage
│   │   ├── globals.css                         # CSS tokens + Tailwind base
│   │   ├── edicoes/
│   │   │   ├── page.tsx                        # All editions archive
│   │   │   └── [edicao]/
│   │   │       ├── page.tsx                    # Single edition
│   │   │       └── [slug]/page.tsx             # Article
│   │   ├── categorias/[categoria]/page.tsx     # Category feed
│   │   ├── tenha-sua-materia/page.tsx          # Lead capture
│   │   └── sobre/page.tsx                      # About
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── magazine/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleHero.tsx
│   │   │   ├── ArticleBody.tsx
│   │   │   ├── EditionBadge.tsx
│   │   │   ├── EditionStrip.tsx
│   │   │   ├── HighlightsBox.tsx
│   │   │   ├── PullQuote.tsx
│   │   │   ├── MiniBio.tsx
│   │   │   ├── CategoryTag.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── NewsletterSignup.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── WhatsAppFloat.tsx
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts
│   │   └── utils.ts
│   │
│   ├── sanity/schemas/
│   │   ├── index.ts
│   │   ├── article.ts
│   │   ├── edicao.ts
│   │   └── pessoa.ts
│   │
│   ├── messages/
│   │   ├── pt-BR.json
│   │   └── en.json
│   │
│   └── types/
│       ├── article.ts
│       ├── edicao.ts
│       └── pessoa.ts
│
├── public/
│   ├── logos/
│   │   ├── pessoas-globais-full.svg
│   │   ├── pessoas-globais-icon.svg
│   │   └── pessoas-globais-dark.svg
│   └── og/default-og.png                      # 1200×630
│
├── SPEC.md
├── CLAUDE.md
├── next.config.ts
├── tailwind.config.ts
├── sanity.config.ts
└── next-sitemap.config.js
```

---

## 9. CMS System

### 9.1 Platform Research & Comparison

Research conducted February 2026 across leading headless CMS platforms for Next.js 14+ App Router projects.

| Platform | Best For | Editor Experience | Next.js Integration | Free Tier | Hosting |
|---|---|---|---|---|---|
| **Sanity** | Developer-first, structured content at scale | Good — clean Studio UI | ⭐ Native, ISR + live preview | 3 users, 10GB | Cloud (Sanity hosted) |
| **Storyblok** | Visual editing, non-technical teams | ⭐ Best — visual drag & drop | Great, App Router support | 1 user, limited | Cloud |
| **Payload CMS** | Full TypeScript control, self-hosted | Good — React-based admin | ⭐ Native Next.js — runs inside app | None (self-hosted) | Self-hosted or cloud |
| **Contentful** | Enterprise, multi-language, multi-team | Good | Great, REST + GraphQL | 5 users, limited | Cloud |
| **Prismic** | Fast setup, reusable content blocks (Slices) | Good — visual editor | Great, Slice Machine | 1 user, 1 repo | Cloud |
| **Strapi** | Open-source, full backend control | Good — customizable | Good, REST + GraphQL | Open source | Self-hosted |

---

### 9.2 Recommendation: **Sanity v3**

**Sanity is the right choice for Pessoas Globais.** Here is why:

| Criteria | Why Sanity Wins |
|---|---|
| **Structured editorial content** | Sanity is purpose-built for exactly this — articles, editions, people — with typed schemas in code |
| **PT-BR + EN bilingual** | Native reference-based translation model — link PT-BR article to EN version cleanly |
| **Non-technical editors** | Sanity Studio is clean, intuitive, and customizable — editors publish without touching code |
| **Next.js 14 App Router** | First-class support — `next-sanity` package, ISR revalidation via webhooks, live preview, Draft Mode |
| **Free tier** | 3 users, 10GB storage, 500k API requests/month — sufficient for Phase 1 |
| **Image CDN** | Built-in image optimization via `@sanity/image-url` — no extra Cloudinary needed |
| **GROQ query language** | More powerful and readable than REST or GraphQL for relational editorial content |
| **Real-time collaboration** | Multiple editors can work simultaneously with live conflict resolution |
| **Version history** | Full document history — restore any previous version of any article |
| **Upgrade path** | Scales to enterprise without changing architecture or migrating data |

**Alternatives considered and why not chosen:**
- **Storyblok** — better visual editor but overkill for structured magazine articles; page-builder model doesn't fit editorial workflow
- **Payload** — excellent but requires self-hosting infrastructure; adds ops complexity not needed at Phase 1
- **Contentful** — enterprise pricing escalates fast; free tier too limited for 2 languages + multiple content types

---

### 9.3 Sanity Studio Setup

```bash
# Initialize Sanity in the pessoasglobais project
npm create sanity@latest -- \
  --project-id YOUR_PROJECT_ID \
  --dataset production \
  --template clean

# Install Next.js integration packages
npm install next-sanity @sanity/image-url @portabletext/react
```

**`.env.local`:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_write_token      # Server-only — never expose client-side
SANITY_WEBHOOK_SECRET=your_webhook_secret   # For ISR revalidation
```

**Sanity client (`src/lib/sanity/client.ts`):**
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-02-01',
  useCdn: true,   // false for Draft Mode / preview
})
```

**Image helper (`src/lib/sanity/image.ts`):**
```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Usage:
// urlFor(article.imagemCapa).width(1200).height(630).quality(80).format('webp').url()
```

---

### 9.4 Content Schemas

#### Article (`src/sanity/schemas/article.ts`)

```typescript
export const article = {
  name: 'article',
  title: 'Matéria',
  type: 'document',
  groups: [
    { name: 'content',  title: 'Conteúdo',    default: true },
    { name: 'media',    title: 'Mídia' },
    { name: 'meta',     title: 'Metadados' },
    { name: 'seo',      title: 'SEO' },
  ],
  fields: [
    // ── CONTENT GROUP ──────────────────────────────────────
    { name: 'titulo',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: R => R.required().max(100)
    },
    { name: 'linhaFina',
      title: 'Linha Fina (Deck)',
      type: 'string',
      group: 'content',
      description: 'Subtítulo que complementa o título. Máx. 200 caracteres.',
      validation: R => R.required().max(200)
    },
    { name: 'destaques',
      title: 'Destaques (máx. 3)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'Três bullet points de destaque — aparecem acima do corpo.',
      validation: R => R.required().min(3).max(3)
    },
    { name: 'corpo',
      title: 'Corpo da Matéria',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              { name: 'link', type: 'object', title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }]
              }
            ]
          }
        },
        { type: 'image', options: { hotspot: true },
          fields: [{ name: 'caption', type: 'string', title: 'Legenda' }]
        }
      ]
    },
    { name: 'citacaoDestaque',
      title: 'Citação em Destaque (Pull Quote)',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'texto', type: 'text',   title: 'Citação',     validation: R => R.max(200) },
        { name: 'autor', type: 'string', title: 'Atribuição',  description: 'Ex: — Maria Silva, CEO da Empresa' }
      ]
    },

    // ── MEDIA GROUP ─────────────────────────────────────────
    { name: 'imagemCapa',
      title: 'Imagem de Capa',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: R => R.required(),
      description: 'Mínimo 1200×800px. Somente fotos profissionais.'
    },
    { name: 'legendaImagem',
      title: 'Legenda da Imagem',
      type: 'string',
      group: 'media'
    },

    // ── META GROUP ──────────────────────────────────────────
    { name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      options: { source: 'titulo', maxLength: 96 },
      validation: R => R.required()
    },
    { name: 'edicao',
      title: 'Edição',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'edicao' }],
      validation: R => R.required()
    },
    { name: 'categoria',
      title: 'Categoria',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Liderança',  value: 'Liderança' },
          { title: 'Negócios',   value: 'Negócios' },
          { title: 'Cultura',    value: 'Cultura' },
          { title: 'Diáspora',   value: 'Diáspora' },
          { title: 'Tecnologia', value: 'Tecnologia' },
        ],
        layout: 'radio'
      },
      validation: R => R.required()
    },
    { name: 'entrevistado',
      title: 'Entrevistado / Protagonista',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'pessoa' }]
    },
    { name: 'autor',
      title: 'Autor da Matéria',
      type: 'string',
      group: 'meta',
      initialValue: 'Equipe Pessoas Globais'
    },
    { name: 'dataPublicacao',
      title: 'Data de Publicação',
      type: 'date',
      group: 'meta',
      validation: R => R.required()
    },
    { name: 'tempoLeitura',
      title: 'Tempo de Leitura (min)',
      type: 'number',
      group: 'meta',
      description: 'Estimativa: palavras ÷ 200'
    },
    { name: 'featured',
      title: 'Matéria em Destaque?',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Apenas UMA matéria por edição pode ser destaque.'
    },
    { name: 'idioma',
      title: 'Idioma',
      type: 'string',
      group: 'meta',
      options: { list: ['pt-BR', 'en'], layout: 'radio' },
      initialValue: 'pt-BR'
    },
    { name: 'traducao',
      title: 'Versão em Inglês',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'article' }],
      description: 'Link para a versão em inglês desta matéria.'
    },

    // ── SEO GROUP ───────────────────────────────────────────
    { name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Deixe em branco para usar o Título. Máx. 60 caracteres.',
      validation: R => R.max(60)
    },
    { name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Deixe em branco para usar a Linha Fina. Máx. 155 caracteres.',
      validation: R => R.max(155)
    },
  ],
  preview: {
    select: {
      title:    'titulo',
      subtitle: 'edicao.tema',
      media:    'imagemCapa',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title:    featured ? `⭐ ${title}` : title,
        subtitle: subtitle || 'Sem edição',
        media,
      }
    }
  },
  orderings: [
    { title: 'Data (mais recente)', name: 'dataDesc', by: [{ field: 'dataPublicacao', direction: 'desc' }] }
  ]
}
```

#### Edition (`src/sanity/schemas/edicao.ts`)

```typescript
export const edicao = {
  name: 'edicao',
  title: 'Edição',
  type: 'document',
  fields: [
    { name: 'numero',
      title: 'Número da Edição',
      type: 'number',
      validation: R => R.required().integer().positive()
    },
    { name: 'tema',
      title: 'Tema Central',
      type: 'string',
      validation: R => R.required()
    },
    { name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: (doc: any) => `edicao-${doc.numero}` },
      validation: R => R.required()
    },
    { name: 'dataPublicacao',
      title: 'Data de Publicação',
      type: 'date',
      validation: R => R.required()
    },
    { name: 'imagemCapa',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true }
    },
    { name: 'editorial',
      title: 'Editorial',
      type: 'text',
      description: '2–4 frases de apresentação da edição pelo editor.'
    },
    { name: 'publicada',
      title: 'Publicada?',
      type: 'boolean',
      initialValue: false,
      description: 'Marque como true apenas quando a edição estiver pronta para publicar.'
    },
  ],
  preview: {
    select: { numero: 'numero', tema: 'tema', media: 'imagemCapa', publicada: 'publicada' },
    prepare({ numero, tema, media, publicada }) {
      return {
        title:    `Edição #${numero} — ${tema}`,
        subtitle: publicada ? '✅ Publicada' : '⏳ Rascunho',
        media,
      }
    }
  },
  orderings: [
    { title: 'Número (desc)', name: 'numeroDesc', by: [{ field: 'numero', direction: 'desc' }] }
  ]
}
```

#### Person (`src/sanity/schemas/pessoa.ts`)

```typescript
export const pessoa = {
  name: 'pessoa',
  title: 'Pessoa / Entrevistado',
  type: 'document',
  fields: [
    { name: 'nome',      title: 'Nome Completo',       type: 'string', validation: R => R.required() },
    { name: 'titulo',    title: 'Cargo / Título',      type: 'string' },
    { name: 'empresa',   title: 'Empresa',             type: 'string' },
    { name: 'bio',       title: 'Mini Bio',            type: 'text',
      description: 'Máx. 300 caracteres. Terceira pessoa. Ex: "Maria é fundadora da Empresa X..."',
      validation: R => R.required().max(300)
    },
    { name: 'foto',      title: 'Foto',                type: 'image', options: { hotspot: true } },
    { name: 'linkedin',  title: 'LinkedIn URL',        type: 'url' },
    { name: 'instagram', title: 'Instagram URL',       type: 'url' },
    { name: 'pais',      title: 'País',                type: 'string' },
  ],
  preview: {
    select: { title: 'nome', subtitle: 'titulo', media: 'foto' }
  }
}
```

#### Schema Registry (`src/sanity/schemas/index.ts`)

```typescript
import { article } from './article'
import { edicao }  from './edicao'
import { pessoa }  from './pessoa'

export const schemaTypes = [article, edicao, pessoa]
```

---

### 9.5 GROQ Queries (`src/lib/sanity/queries.ts`)

```typescript
// Homepage — featured article (hero)
export const featuredArticleQuery = `
  *[_type == "article" && featured == true && idioma == "pt-BR"]
  | order(dataPublicacao desc)[0] {
    titulo, linhaFina, slug, categoria, dataPublicacao, tempoLeitura,
    imagemCapa, destaques,
    "edicaoNumero": edicao->numero,
    "edicaoSlug":   edicao->slug.current,
    "edicaoTema":   edicao->tema,
    "entrevistadoNome": entrevistado->nome,
    "entrevistadoFoto": entrevistado->foto,
  }
`

// Homepage — article grid (9 most recent)
export const recentArticlesQuery = `
  *[_type == "article" && idioma == "pt-BR" && edicao->publicada == true]
  | order(dataPublicacao desc)[0...9] {
    titulo, linhaFina, slug, categoria, dataPublicacao, tempoLeitura,
    imagemCapa,
    "edicaoNumero": edicao->numero,
    "edicaoSlug":   edicao->slug.current,
    "entrevistadoNome": entrevistado->nome,
  }
`

// Edition page — all articles in one edition
export const editionArticlesQuery = `
  *[_type == "article" && edicao->slug.current == $edicao && idioma == "pt-BR"]
  | order(featured desc, dataPublicacao desc) {
    titulo, linhaFina, slug, categoria, dataPublicacao, tempoLeitura,
    imagemCapa, featured,
    "entrevistadoNome": entrevistado->nome,
  }
`

// Single article by slug
export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    titulo, linhaFina, slug, categoria, dataPublicacao, tempoLeitura,
    imagemCapa, legendaImagem, destaques, corpo, citacaoDestaque,
    idioma, seoTitle, seoDescription,
    "edicao": edicao->{ numero, tema, slug },
    "entrevistado": entrevistado->{ nome, titulo, empresa, bio, foto, linkedin, instagram, pais },
    "traducao": traducao->{ slug, idioma },
  }
`

// Category page
export const articlesByCategoryQuery = `
  *[_type == "article" && categoria == $categoria && idioma == "pt-BR"
    && edicao->publicada == true]
  | order(dataPublicacao desc) {
    titulo, linhaFina, slug, categoria, dataPublicacao, tempoLeitura,
    imagemCapa,
    "edicaoNumero": edicao->numero,
    "edicaoSlug":   edicao->slug.current,
  }
`

// All editions (published)
export const allEditionsQuery = `
  *[_type == "edicao" && publicada == true]
  | order(numero desc) {
    numero, tema, slug, dataPublicacao, imagemCapa, editorial,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`
```

---

### 9.6 ISR Revalidation via Webhook

When an editor publishes in Sanity, the page rebuilds automatically without a full deploy.

**Revalidation route (`src/app/api/revalidate/route.ts`):**
```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json()
  const { _type, slug, edicao } = body

  if (_type === 'article' && slug?.current) {
    revalidatePath(`/edicoes/${edicao?.slug?.current}/${slug.current}`)
    revalidatePath(`/edicoes/${edicao?.slug?.current}`)
    revalidatePath('/')
  }

  if (_type === 'edicao') {
    revalidatePath('/edicoes')
    revalidatePath('/')
  }

  return NextResponse.json({ revalidated: true })
}
```

**Sanity webhook setup:**
1. Go to `sanity.io/manage` → your project → API → Webhooks
2. Add webhook: `https://pessoasglobais.com/api/revalidate?secret=YOUR_SECRET`
3. Trigger on: `create`, `update`, `delete`
4. Filter: `_type == "article" || _type == "edicao"`

---

### 9.7 Draft Mode (Preview Before Publishing)

Editors can preview unpublished content at the live URL before hitting publish.

```typescript
// src/app/api/draft/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug   = searchParams.get('slug')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  draftMode().enable()
  redirect(slug ?? '/')
}
```

---

### 9.8 Sanity Studio Access

The Sanity Studio (editor dashboard) is hosted at:

```
https://pessoasglobais.sanity.studio
```

Non-technical editors access it directly in their browser — no code, no terminal.  
Invite team members at `sanity.io/manage` → Members → Invite.

**Free tier limits (sufficient for Phase 1):**

| Resource | Free Limit | Expected Usage |
|---|---|---|
| Users | 3 | Editor + developer + admin |
| Datasets | 2 | `production` + `staging` |
| Storage | 10 GB | ~500 articles with images |
| API requests | 500k / month | Well within Phase 1 range |
| Bandwidth | 1 TB / month | CDN-served images |

---

## 10. Internationalization

**Library:** `next-intl` · **Default:** `pt-BR` (no prefix) · **EN:** `/en/` prefix

```json
// src/messages/pt-BR.json
{
  "nav": { "editions": "Edições", "categories": "Categorias", "about": "Sobre", "cta": "Tenha sua Matéria" },
  "article": { "readTime": "{min} min de leitura", "publishedOn": "Publicado em {date}", "highlights": "Destaques desta matéria", "share": "Compartilhar", "back": "Voltar para Edição #{num}" },
  "newsletter": { "title": "Receba cada nova edição", "sub": "Histórias de empreendedores globais direto no seu email.", "placeholder": "seu@email.com", "cta": "Assinar" },
  "landing": { "headline": "Sua história merece ser contada ao mundo", "sub": "Seja a próxima voz da Pessoas Globais", "button": "Tenha sua Matéria" },
  "footer": { "tagline": "A revista dos empreendedores globais", "credit": "Uma publicação GrowBiz Media" }
}
```

PT-BR date format: `dd 'de' MMMM 'de' yyyy` (via `date-fns/locale/ptBR`)

---

## 11. SEO Requirements

### Metadata per page

```typescript
// Article page example
export async function generateMetadata({ params }: Props) {
  const article = await getArticle(params.slug)
  return {
    title: `${article.titulo} | Pessoas Globais`,
    description: article.seoDescription || article.linhaFina,
    openGraph: {
      title: article.titulo,
      description: article.linhaFina,
      images: [{ url: urlFor(article.imagemCapa).width(1200).height(630).url(), width: 1200, height: 630 }],
      type: 'article',
      publishedTime: article.dataPublicacao,
      locale: 'pt_BR',
      siteName: 'Pessoas Globais',
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `https://pessoasglobais.com/edicoes/${params.edicao}/${params.slug}`,
      languages: article.traducao ? { en: `https://pessoasglobais.com/en/edicoes/${params.edicao}/${article.traducao.slug.current}` } : undefined
    }
  }
}
```

### JSON-LD (Article pages)

```typescript
const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: article.titulo,
  image: urlFor(article.imagemCapa).url(),
  datePublished: article.dataPublicacao,
  author: { '@type': 'Person', name: article.entrevistado?.nome },
  publisher: { '@type': 'Organization', name: 'Pessoas Globais', logo: { '@type': 'ImageObject', url: 'https://pessoasglobais.com/logos/pessoas-globais-icon.svg' } },
  inLanguage: 'pt-BR',
}
```

### Sitemap (`next-sitemap.config.js`)

```javascript
module.exports = {
  siteUrl: 'https://pessoasglobais.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
}
```

### Pre-launch Checklist

- [ ] Every page: unique `<title>` 50–60 chars
- [ ] Every page: `<meta description>` 130–155 chars
- [ ] OG images 1200×630 for all articles
- [ ] sitemap.xml submitted to Google Search Console
- [ ] GA4 via `@next/third-parties/google`
- [ ] All images via `next/image` with `alt`
- [ ] LCP < 2.5s · CLS < 0.1 · INP < 200ms

---

## 12. Landing Page — "Tenha sua Matéria"

**Route:** `/tenha-sua-materia`

| # | Section | Priority |
|---|---|---|
| 1 | Hero — "Sua história merece ser contada ao mundo" + CTA | Critical |
| 2 | What's included — article · photos · SEO · network | Critical |
| 3 | Published examples — real article cards | Critical |
| 4 | Testimonials — 2–3 quotes | Recommended |
| 5 | Form — Nome · Email · WhatsApp · Empresa · Cargo · Área · História · Como nos conheceu | Critical |
| 6 | FAQ accordion | Recommended |
| 7 | `WhatsAppFloat` fixed | Critical |

**Form:** Formspree (free, no backend)  
**WA pre-fill:** `"Olá! Tenho interesse em ter minha matéria na Pessoas Globais."`

---

## 13. GitHub Branching Strategy

```
main      ──────────────────────►  pessoasglobais.com (production)
  └── staging ────────────────►   Preview URL
        ├── feature/homepage
        ├── feature/article-template
        ├── feature/edition-page
        ├── feature/tenha-sua-materia
        ├── feature/sanity-setup
        ├── feature/i18n
        ├── fix/[description]
        └── content/edicao-1
```

**Commit convention:** `feat:` `fix:` `content:` `style:` `chore:` `docs:`

---

## 14. CI/CD Deployment

```yaml
# .github/workflows/deploy.yml
name: CI
on:
  push: { branches: [main, staging] }
  pull_request: { branches: [main, staging] }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

**Vercel env vars:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_WHATSAPP_NUMBER     # 15551234567
NEXT_PUBLIC_FORMSPREE_ID
```

---

## 15. Component Naming Conventions

```
PascalCase  →  Components    ArticleCard.tsx · PullQuote.tsx
camelCase   →  Utilities     formatDate.ts · urlFor.ts
kebab-case  →  Routes        /tenha-sua-materia/page.tsx
UPPER_SNAKE →  Constants     PG_CATEGORIES · DEFAULT_OG_IMAGE
```

**Rules:**
- Named exports only — never `export default` for components
- Always `pg-*` Tailwind tokens — never hardcode hex in JSX
- Mobile-first: base = mobile · `md:` = 768px · `lg:` = 1024px
- All images via `next/image`
- No `'use client'` for data fetching — server components only

---

## 16. Content Guidelines for Editors

> Share with non-technical editors who publish in Sanity CMS.

| Field | Rule |
|---|---|
| Título | Max 100 chars · strong verb · no clickbait |
| Linha Fina | Max 200 chars · adds context, never repeats title |
| Destaques | Exactly 3 bullets · each under 80 chars |
| Corpo | 600–2000 words · H2/H3 only · max 2 inline images · exactly 1 pull quote |
| Citação | Max 180 chars · format: `— First Last, Title at Company` |
| Imagem Capa | Min 1200×800px · professional photos only · always fill caption |
| Mini Bio | Max 300 chars · third person · `"[Name] é [title] da [company]..."` |
| Featured | Only ONE article per edition may have `featured: true` |
| Publicada | Set to `true` only when fully reviewed and approved |

---

## 17. Performance Budgets

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| First load JS | < 150kb |
| Image size | < 200kb (WebP via next/image) |
| Lighthouse | > 90 all categories |

---

## 18. Package Dependencies

```bash
npm install next-sanity @sanity/image-url @portabletext/react
npm install next-intl
npm install next-sitemap
npm install react-share
npm install @next/third-parties
npm install date-fns
```

**`.env.local`:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_FORMSPREE_ID=
```

---

## Figma Setup Checklist

Before designing any screens:

- [ ] Create Figma file: `Pessoas Globais — Design System`
- [ ] Page 1: **Tokens** — create all color variables from §3 as Figma Variables
- [ ] Page 2: **Typography** — create all text styles from §4
- [ ] Page 3: **Components** — build all 13 components from §5 with variants
- [ ] Page 4: **Homepage** — desktop 1440px + mobile 375px
- [ ] Page 5: **Article Template** — desktop + mobile
- [ ] Page 6: **Landing Page** — tenha-sua-materia
- [ ] Page 7: **Edge Cases** — empty states, loading, error

---

*pessoasglobais.com SPEC.md v2.0 — GrowBiz Media dev team. Last update: February 2026.*
