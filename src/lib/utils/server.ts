import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'

import 'server-only'

import type { NamespaceKeys, NestedKeyOf } from 'next-intl'

export async function getServerTranslations<
  NestedKey extends NamespaceKeys<
    IntlMessages,
    NestedKeyOf<IntlMessages>
  > = never
>(namespace?: NestedKey) {
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? 'en'
  return await getTranslations({ locale, namespace })
}
