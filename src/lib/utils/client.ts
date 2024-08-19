import { Inter } from 'next/font/google'

export const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

export const inter = Inter({ subsets: ['latin'] })

export function getBaseUrl() {
  if (isProd) return 'https://test-open.com'
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
