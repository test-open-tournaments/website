import { locales } from '@navigation'
import deepmerge from 'deepmerge'
import { getRequestConfig } from 'next-intl/server'
// biome-ignore lint/nursery/noRestrictedImports: this is not a restricted import
import { notFound } from 'next/navigation'

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale)) notFound()

	const userMessages = (await import(`./messages/${locale}.json`)).default
	const defaultMessages = (await import('./messages/en.json')).default
	return { messages: deepmerge(defaultMessages, userMessages) }
})
