import { genOgTwitterImage } from '@metadata'
import { getBaseUrl, inter } from '@utils/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

import '../../styles/globals.css'

import ConvexProvider from './_components/convex-provider'

import type { MetadataProps } from '@types'
import type { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
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
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <ConvexProvider>
        <NextIntlClientProvider messages={messages}>
          <body className={inter.className}>
            {children}
            <SpeedInsights />
            <Analytics />
          </body>
        </NextIntlClientProvider>
      </ConvexProvider>
    </html>
  )
}
