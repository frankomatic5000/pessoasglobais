import { type SchemaTypeDefinition } from 'sanity'
import { article }   from '../schemas/article'
import { edicao }    from '../schemas/edicao'
import { pessoa }    from '../schemas/pessoa'
import { categoria } from '../schemas/categoria'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, edicao, pessoa, categoria],
}
