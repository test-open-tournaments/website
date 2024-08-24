import { isProd } from '@utils/client'
import { get } from '@vercel/edge-config'

import ComingSoon from './_components/coming-soon'

export default async function HomePage() {
  const isPrerelease = (await get('prerelease')) && isProd
  return isPrerelease ? <ComingSoon /> : <div>TEST OPEN</div>
}
