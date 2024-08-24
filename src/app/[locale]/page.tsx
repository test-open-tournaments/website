import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { isProd } from '@utils/client'
import { get } from '@vercel/edge-config'

import ComingSoon from './_components/coming-soon'
import UserButton from './_components/user-button'

export default async function HomePage() {
  const isPrerelease = (await get('prerelease')) && isProd
  const { userId } = auth()
  return isPrerelease ? (
    <ComingSoon />
  ) : (
    <div>
      <h1>TEST OPEN</h1>
      {!userId && <SignInButton />}
      {userId && <UserButton />}
    </div>
  )
}
