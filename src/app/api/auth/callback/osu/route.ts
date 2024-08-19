import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { osuAuth } from '@osu'
import { encrypt } from '@session'
import { getTranslations } from 'next-intl/server'

import { getDiscordAuthUrl } from '~/lib/discord'
import { authError } from '../../utils'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale') ?? 'en'
  const code = searchParams.get('code')
  const url = new URL(request.url)

  const t = await getTranslations({ locale, namespace: 'APICallbacks' })

  if (!code) return authError(url, t('Errors.missingCode'))

  try {
    cookies().delete('session')
    const tokens = await osuAuth.requestToken(code)
    cookies().set('osu-tokens', await encrypt(tokens, '10 mins from now'), {
      httpOnly: true
    })
  } catch (err) {
    return authError(url)
  }

  return NextResponse.redirect(getDiscordAuthUrl())
}
