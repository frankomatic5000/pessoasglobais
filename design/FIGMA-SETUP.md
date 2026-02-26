# Figma Design System — Pessoas Globais

## 1. Plugin required
Install **Tokens Studio for Figma** (free tier works):
https://www.figma.com/community/plugin/843461159747178978

---

## 2. Import tokens
1. Open Tokens Studio → **Load** → **JSON**
2. Paste the contents of `design/tokens.json`
3. Click **Save** → **Apply to document**

You'll get three token sets automatically:
- `global` — primitive values (raw colours, type scale, spacing)
- `semantic` — alias tokens (what to actually use in components)
- `typography` — pre-built text styles per role

---

## 3. Figma Variables (native, Figma 2024+)
Alternatively, use **Figma Variables** directly:

| Collection | Group | Variable |
|---|---|---|
| **Primitives** | Color/Red | `red-default` `red-dark` `red-light` |
| **Primitives** | Color/Navy | `navy-default` `navy-dark` `navy-light` |
| **Primitives** | Color/Neutral | `ink` `paper` `surface` `muted` `border` `tag` `highlight` |
| **Semantic** | Background | `page` `card` `navbar` `header` `tag` `highlight` |
| **Semantic** | Text | `primary` `muted` `on-dark` `on-brand` |
| **Semantic** | Border | `default` `accent` |

---

## 4. Text styles to create
| Style name | Family | Size | Weight | Leading | Notes |
|---|---|---|---|---|---|
| `Display/Hero` | Playfair Display | 64 | Black 900 | 1.05 | Homepage hero |
| `Display/Article Title` | Playfair Display | 48 | Black 900 | 1.05 | Desktop article h1 |
| `Display/Article Title/Mobile` | Playfair Display | 36 | Black 900 | 1.05 | Mobile article h1 |
| `Display/H2` | Playfair Display | 24 | Bold 700 | 1.3 | In-article subheadings |
| `Display/Pull Quote` | Playfair Display | 28 | Bold 700 | 1.3 | Italic |
| `Body/Lead` | DM Sans | 20 | Light 300 | 1.65 | Article deck, italic |
| `Body/Default` | DM Sans | 16 | Regular 400 | 1.85 | Article body |
| `Body/UI` | DM Sans | 13 | Medium 500 | 1.5 | Card copy, captions |
| `Body/Small` | DM Sans | 11 | Medium 500 | 1.5 | Tags, chips |
| `Mono/Label` | DM Mono | 10 | Regular 400 | 1 | UPPERCASE, ls 0.15em |
| `Mono/Badge` | DM Mono | 10 | Regular 400 | 1 | UPPERCASE, ls 0.12em |
| `Mono/Meta` | DM Mono | 10 | Regular 400 | 1 | Byline metadata |

---

## 5. Recommended Figma file structure

```
📄 Pessoas Globais — Design System
  📑 Cover
  📑 Foundations
      🖼 Colors
      🖼 Typography
      🖼 Spacing & Grid
      🖼 Iconography
  📑 Components
      🖼 Buttons & Chips
      🖼 Navigation (Navbar / Mobile Menu)
      🖼 Article Card
      🖼 Edition Badge / Strip
      🖼 Category Tag
      🖼 Highlights Box
      🖼 Pull Quote
      🖼 Mini Bio
      🖼 Share Buttons
      🖼 Newsletter Signup
      🖼 CTA Banner
      🖼 Footer

📄 Pessoas Globais — Pages
  📑 Homepage
  📑 Edições Archive
  📑 Single Edition
  📑 Article Page
  📑 Category Feed
  📑 Tenha sua Matéria
  📑 Sobre
```

---

## 6. Grid / Layout
| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| Mobile (< 640px) | 4 | 16px | 20px |
| Tablet (640–1024px) | 8 | 24px | 24px |
| Desktop (> 1024px) | 12 | 32px | 40px |

Max content width: **1280px** (`max-w-7xl`)
Article body max-width: **780px**

---

## 7. Key component specs

### Navbar
- Height: **64px** · Background: `#1E3560` (navy)
- Logo: left-aligned · CTA button: `bg-red` right-aligned
- Shadow: `0 2px 20px rgba(0,0,0,0.3)`

### Article Card
- Image aspect ratio: **4:3**
- Image hover: scale `1.04`, transition 400ms ease
- Title hover colour: `#E8202A` (red)
- Category label: `Mono/Label`, `#F2F2F2` bg → `#E8202A` bg on hover

### Edition Badge
- `#E8202A` background · white text · `Mono/Badge` · uppercase

### Highlights Box
- Left border: 3px solid `#E8202A`
- Background: `#FFF2F2`
- Arrow prefix `→` in `#E8202A` bold

### Pull Quote (full-width)
- Left border: 4px solid `#E8202A`
- Background: `rgba(232,32,42,0.04)`
- Text: `Display/Pull Quote`, italic, `#1E3560`

### Mini Bio
- Top border: 2px solid `#E8202A`
- Background: `#F2F2F2`
- Avatar border: 2px solid `#E8202A`

### CTA Banner
- Background: `#1E3560` (navy) · always full-width
- Button: `#E8202A` → hover `#C41820`
