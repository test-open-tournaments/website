import 'server-only'

import { LegacyClient } from 'osu-web.js'
import { env } from '@env'

export const osuApi = new LegacyClient(env.OSU_API_KEY)
