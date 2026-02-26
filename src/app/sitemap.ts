import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

const BASE_URL = 'https://pessoasglobais.com'
const CATEGORIES = ['lideranca', 'negocios', 'cultura', 'diaspora', 'tecnologia']

// Re-generate the sitemap at most once per hour
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [editions, articles] = await Promise.all([
    client.fetch<{ slug: string }[]>(
      groq`*[_type=="edicao" && publicada==true]{"slug": slug.current}`
    ),
    client.fetch<{ slug: string; edicao: string }[]>(
      groq`*[_type=="article" && idioma=="pt-BR"]{"slug": slug.current, "edicao": edicao->slug.current}`
    ),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/edicoes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tenha-sua-materia`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/sobre`, changeFrequency: 'monthly', priority: 0.5 },
    ...CATEGORIES.map((c) => ({
      url: `${BASE_URL}/categorias/${c}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]

  const editionRoutes: MetadataRoute.Sitemap = editions.map((e) => ({
    url: `${BASE_URL}/edicoes/${e.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug && a.edicao)
    .map((a) => ({
      url: `${BASE_URL}/edicoes/${a.edicao}/${a.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    }))

  return [...staticRoutes, ...editionRoutes, ...articleRoutes]
}
