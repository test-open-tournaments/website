import { localePrefix, locales } from '@navigation'
import createIntlMiddleware from 'next-intl/middleware'

import type { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix,
	defaultLocale: 'en'
})

export default async function middleware(request: NextRequest) {
	const response = intlMiddleware(request)
	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
