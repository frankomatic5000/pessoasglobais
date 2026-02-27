import { getRequestConfig } from 'next-intl/server'

// Without i18n routing: serve PT-BR for all paths.
// When EN routing is added later, this config will detect locale from the URL.
export default getRequestConfig(async () => {
  return {
    locale: 'pt',
    messages: (await import('../../messages/pt.json')).default,
  }
})
