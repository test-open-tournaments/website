import { genOgTwitterImage } from '@metadata'
import { getBaseUrl, inter } from '@utils/client'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

import '../../styles/globals.css'

import ConvexProvider from './_components/convex-provider'

import type { Metadata } from 'next'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    metadataBase: new URL(getBaseUrl()),
    title: {
      template: '%s • TEST Open',
      default: 'TEST Open'
    },
    description: t('description'),
    ...genOgTwitterImage({
      title: {
        template: '%s',
        default: 'TEST Open'
      },
      description: t('description'),
      locale
    })
  } satisfies Metadata
}

interface LocaleLayoutProps {
  children: React.ReactNode
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <ConvexProvider>
        <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>

          <Analytics />
        </body>
      </ConvexProvider>
    </html>
  )
}
