import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get('locale')?.value
  const locale = raw === 'en' ? 'en' : 'pt'

  const messages =
    locale === 'en'
      ? (await import('../../messages/en.json')).default
      : (await import('../../messages/pt.json')).default

  return { locale, messages }
})
