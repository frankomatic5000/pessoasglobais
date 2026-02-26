import { type SchemaTypeDefinition } from 'sanity'
import { article } from '../schemas/article'
import { edicao }  from '../schemas/edicao'
import { pessoa }  from '../schemas/pessoa'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, edicao, pessoa],
}
