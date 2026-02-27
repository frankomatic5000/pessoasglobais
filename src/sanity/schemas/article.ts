export const article = {
  name: 'article',
  title: 'Matéria',
  type: 'document',
  groups: [
    { name: 'content',  title: 'Conteúdo',  default: true },
    { name: 'media',    title: 'Mídia' },
    { name: 'meta',     title: 'Metadados' },
    { name: 'seo',      title: 'SEO' },
  ],
  fields: [
    { name: 'titulo', title: 'Título', type: 'string', group: 'content', validation: (R: any) => R.required().max(100) },
    { name: 'linhaFina', title: 'Linha Fina (Deck)', type: 'string', group: 'content', validation: (R: any) => R.required().max(200) },
    { name: 'destaques', title: 'Destaques (exatamente 3)', type: 'array', of: [{ type: 'string' }], group: 'content', validation: (R: any) => R.required().min(3).max(3) },
    { name: 'corpo', title: 'Corpo da Matéria', type: 'array', group: 'content',
      of: [
        { type: 'block',
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
              { name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] }
            ]
          }
        },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', type: 'string', title: 'Legenda' }] }
      ]
    },
    { name: 'citacaoDestaque', title: 'Citação em Destaque', type: 'object', group: 'content',
      fields: [
        { name: 'texto', type: 'text', title: 'Citação', validation: (R: any) => R.max(200) },
        { name: 'autor', type: 'string', title: 'Atribuição', description: '— Nome, Cargo na Empresa' }
      ]
    },
    { name: 'imagemCapa', title: 'Imagem de Capa', type: 'image', group: 'media', options: { hotspot: true }, validation: (R: any) => R.required() },
    { name: 'legendaImagem', title: 'Legenda da Imagem', type: 'string', group: 'media' },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', group: 'meta', options: { source: 'titulo', maxLength: 96 }, validation: (R: any) => R.required() },
    { name: 'edicao', title: 'Edição', type: 'reference', group: 'meta', to: [{ type: 'edicao' }], validation: (R: any) => R.required() },
    { name: 'categoria', title: 'Categoria', type: 'string', group: 'meta',
      options: { list: [
        { title: 'Liderança',  value: 'Liderança' },
        { title: 'Negócios',   value: 'Negócios' },
        { title: 'Cultura',    value: 'Cultura' },
        { title: 'Diáspora',   value: 'Diáspora' },
        { title: 'Tecnologia', value: 'Tecnologia' },
      ], layout: 'radio' },
      validation: (R: any) => R.required()
    },
    { name: 'entrevistado', title: 'Entrevistado', type: 'reference', group: 'meta', to: [{ type: 'pessoa' }] },
    { name: 'autor', title: 'Autor', type: 'string', group: 'meta', initialValue: 'Equipe Pessoas Globais' },
    { name: 'dataPublicacao', title: 'Data de Publicação', type: 'date', group: 'meta', validation: (R: any) => R.required() },
    { name: 'tempoLeitura', title: 'Tempo de Leitura (min)', type: 'number', group: 'meta' },
    { name: 'featured', title: 'Matéria em Destaque?', type: 'boolean', group: 'meta', initialValue: false },
    { name: 'idioma', title: 'Idioma', type: 'string', group: 'meta', options: { list: ['pt-BR', 'en'], layout: 'radio' }, initialValue: 'pt-BR' },
    { name: 'traducao', title: 'Versão em Inglês', type: 'reference', group: 'meta', to: [{ type: 'article' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', validation: (R: any) => R.max(60) },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'seo', validation: (R: any) => R.max(155) },
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'edicao.tema', media: 'imagemCapa', featured: 'featured' },
    prepare({ title, subtitle, media, featured }: any) {
      return { title: featured ? `⭐ ${title}` : title, subtitle: subtitle || 'Sem edição', media }
    }
  }
}
