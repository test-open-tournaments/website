import { localePrefix, locales } from '@navigation'
import { decrypt, encrypt } from '@session'
import type { Session } from '@types'
import createIntlMiddleware from 'next-intl/middleware'

import type { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix,
	defaultLocale: 'en'
})

export default async function middleware(request: NextRequest) {
	const response = intlMiddleware(request)

	const session = request.cookies.get('session')?.value
	if (session) {
		const parsed = await decrypt<Session>(session)
		parsed.expires = new Date(Date.now() + 604800 * 1000)

		response.cookies.set({
			name: 'session',
			value: await encrypt(parsed),
			httpOnly: true,
			expires: parsed.expires
		})
	}

	response.headers.set('x-pathname', request.nextUrl.pathname)
	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
