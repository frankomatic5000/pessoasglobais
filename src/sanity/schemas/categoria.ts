export const categoria = {
  name: 'categoria',
  title: 'Categoria',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      description: 'Breve descrição exibida na página da categoria.',
    },
    {
      name: 'cor',
      title: 'Cor (hex override)',
      type: 'string',
      description: 'Opcional — ex: #E8202A. Deixe em branco para usar a cor padrão da marca.',
    },
    {
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
      description: 'Ordem de exibição na barra de categorias (menor = primeiro).',
    },
  ],
  preview: {
    select: { nome: 'nome', ordem: 'ordem' },
    prepare({ nome, ordem }: any) {
      return {
        title: nome,
        subtitle: ordem != null ? `Ordem: ${ordem}` : 'Sem ordem definida',
      }
    },
  },
}
