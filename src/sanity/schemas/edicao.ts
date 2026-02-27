export const edicao = {
  name: 'edicao',
  title: 'Edição',
  type: 'document',
  fields: [
    { name: 'numero', title: 'Número da Edição', type: 'number', validation: (R: any) => R.required().integer().positive() },
    { name: 'tema', title: 'Tema Central', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc: any) => `edicao-${doc.numero}` }, validation: (R: any) => R.required() },
    { name: 'dataPublicacao', title: 'Data de Publicação', type: 'date', validation: (R: any) => R.required() },
    { name: 'imagemCapa', title: 'Imagem de Capa', type: 'image', options: { hotspot: true } },
    { name: 'editorial', title: 'Editorial', type: 'text', description: '2–4 frases de apresentação da edição.' },
    { name: 'publicada', title: 'Publicada?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { numero: 'numero', tema: 'tema', media: 'imagemCapa', publicada: 'publicada' },
    prepare({ numero, tema, media, publicada }: any) {
      return { title: `Edição #${numero} — ${tema}`, subtitle: publicada ? '✅ Publicada' : '⏳ Rascunho', media }
    }
  },
  orderings: [{ title: 'Número (desc)', name: 'numeroDesc', by: [{ field: 'numero', direction: 'desc' }] }]
}
