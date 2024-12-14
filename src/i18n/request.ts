import deepmerge from 'deepmerge'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  // biome-ignore lint/suspicious/noExplicitAny:
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  const userMessages = (await import(`../messages/${locale}.json`)).default
  const defaultMessages = (await import('../messages/en.json')).default

  return {
    locale,
    messages: deepmerge(defaultMessages, userMessages)
  }
})
