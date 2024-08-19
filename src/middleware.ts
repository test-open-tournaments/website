import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { localePrefix, locales } from '@navigation'
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en'
})

const isProtectedRoute = createRouteMatcher([])

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) auth().protect()
  const response = intlMiddleware(request)
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api)(.*)'
  ]
}
