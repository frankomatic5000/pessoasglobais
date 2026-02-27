export const pessoa = {
  name: 'pessoa',
  title: 'Pessoa / Entrevistado',
  type: 'document',
  fields: [
    { name: 'nome', title: 'Nome Completo', type: 'string', validation: (R: any) => R.required() },
    { name: 'titulo', title: 'Cargo / Título', type: 'string' },
    { name: 'empresa', title: 'Empresa', type: 'string' },
    { name: 'bio', title: 'Mini Bio', type: 'text', description: 'Máx. 300 caracteres. Terceira pessoa.', validation: (R: any) => R.required().max(300) },
    { name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'pais', title: 'País', type: 'string' },
  ],
  preview: {
    select: { title: 'nome', subtitle: 'titulo', media: 'foto' }
  }
}
