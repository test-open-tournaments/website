'use server'

import { cookies } from 'next/headers'
import { redirect } from '@navigation'
import { osuAuthUrl } from '@osu'
import { getBaseUrl } from '@utils/client'

export async function signIn(formData: FormData) {
  const returnPath = formData.get('return-path')?.toString()
  if (returnPath) cookies().set('return-url', getBaseUrl() + returnPath)
  redirect(osuAuthUrl)
}
