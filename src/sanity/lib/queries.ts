import { groq } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/react'

// ─── TypeScript types ────────────────────────────────────────────────────────

export interface SanitySlug { current: string }

export interface Categoria {
  nome: string
  slug: SanitySlug
  descricao?: string
}

export interface PessoaStub {
  nome: string
  titulo?: string
  empresa?: string
  bio: string
  foto?: SanityImageSource
  instagram?: string
  pais?: string
}

export interface EdicaoStub {
  _id: string
  numero: number
  tema: string
  slug: SanitySlug
  dataPublicacao: string
  publicada: boolean
}

export interface Edicao extends EdicaoStub {
  editorial?: string
  imagemCapa?: SanityImageSource
  articleCount?: number
}

export interface ArticleStub {
  _id: string
  titulo: string
  linhaFina: string
  slug: SanitySlug
  categoria: Categoria
  autor: string
  dataPublicacao: string
  imagemCapa?: SanityImageSource
  edicao: {
    numero: number
    slug: SanitySlug
  }
}

export interface Article extends ArticleStub {
  destaques: string[]
  corpo: PortableTextBlock[]
  citacaoDestaque?: { texto: string; autor: string }
  legendaImagem?: string
  tempoLeitura?: number
  entrevistado?: PessoaStub
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface EdicaoPage {
  numero: number
  tema: string
  slug: SanitySlug
  dataPublicacao: string
  editorial?: string
  publicada: boolean
  prevEdition?: { slug: SanitySlug } | null
  nextEdition?: { slug: SanitySlug } | null
  featuredArticle?: ArticleStub | null
  articles: ArticleStub[]
}

// ─── Shared article card projection ──────────────────────────────────────────

const ARTICLE_STUB = `
  _id,
  titulo,
  linhaFina,
  slug,
  "categoria": categoria->{ nome, slug },
  autor,
  dataPublicacao,
  imagemCapa,
  edicao->{ numero, slug }
`

// ─── Queries ─────────────────────────────────────────────────────────────────

/** Featured article for homepage hero */
export const featuredArticleQuery = groq`
  *[_type=="article" && featured==true && idioma=="pt-BR"][0]{
    ${ARTICLE_STUB},
    destaques,
    entrevistado->{ nome, titulo, empresa }
  }
`

/** Articles for homepage grid (most recent non-featured) */
export const homepageGridQuery = groq`
  *[_type=="article" && featured!=true && idioma=="pt-BR"] | order(dataPublicacao desc)[0...9]{
    ${ARTICLE_STUB}
  }
`

/** All editions for /edicoes archive */
export const allEditionsQuery = groq`
  *[_type=="edicao"] | order(numero desc){
    _id,
    numero,
    tema,
    slug,
    dataPublicacao,
    publicada,
    editorial,
    imagemCapa,
    "articleCount": count(*[_type=="article" && edicao._ref == ^._id && idioma=="pt-BR"])
  }
`

/** Single edition page — includes featured + rest of articles */
export const edicaoQuery = groq`
  *[_type=="edicao" && slug.current==$slug][0]{
    numero,
    tema,
    slug,
    dataPublicacao,
    editorial,
    publicada,
    "prevEdition": *[_type=="edicao" && numero == ^.numero - 1 && publicada==true][0]{ slug },
    "nextEdition": *[_type=="edicao" && numero == ^.numero + 1 && publicada==true][0]{ slug },
    "featuredArticle": *[_type=="article" && edicao._ref==^._id && featured==true && idioma=="pt-BR"][0]{
      ${ARTICLE_STUB}
    },
    "articles": *[_type=="article" && edicao._ref==^._id && featured!=true && idioma=="pt-BR"] | order(dataPublicacao desc){
      ${ARTICLE_STUB}
    }
  }
`

/** Full article page */
export const articleQuery = groq`
  *[_type=="article" && slug.current==$slug && edicao->slug.current==$edicao][0]{
    ${ARTICLE_STUB},
    destaques,
    corpo,
    citacaoDestaque,
    legendaImagem,
    tempoLeitura,
    entrevistado->{ nome, titulo, empresa, bio, foto, instagram },
    featured,
    seoTitle,
    seoDescription
  }
`

/** Articles filtered by category slug */
export const categoryArticlesQuery = groq`
  *[_type=="article" && categoria->slug.current==$categoria && idioma=="pt-BR"] | order(dataPublicacao desc){
    ${ARTICLE_STUB}
  }
`

/** All article slugs — for generateStaticParams */
export const allArticleSlugsQuery = groq`
  *[_type=="article" && idioma=="pt-BR"]{
    "slug": slug.current,
    "edicao": edicao->slug.current
  }
`

/** All published edition slugs — for generateStaticParams */
export const allEditionSlugsQuery = groq`
  *[_type=="edicao" && publicada==true]{ "slug": slug.current }
`

/** Related articles (same category slug, different slug) */
export const relatedArticlesQuery = groq`
  *[_type=="article" && categoria->slug.current==$categoria && slug.current!=$slug && idioma=="pt-BR"] | order(dataPublicacao desc)[0...3]{
    ${ARTICLE_STUB}
  }
`

/** All categories sorted by ordem */
export const allCategoriasQuery = groq`
  *[_type=="categoria"] | order(ordem asc){ nome, slug, descricao }
`
