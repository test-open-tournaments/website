import { vercel } from '@t3-oss/env-core/presets'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  extends: [vercel()],
  server: {
    CONVEX_AUTH_PRIVATE_KEY: z.string().min(1),
    OSU_CLIENT_SECRET: z.string().min(1),
    OSU_API_KEY: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    DISCORD_BOT_TOKEN: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().min(1),
    NEXT_PUBLIC_OSU_CLIENT_ID: z.coerce.number().min(1),
    NEXT_PUBLIC_OSU_REDIRECT_URI: z.string().min(1),
    NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_DISCORD_REDIRECT_URI: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_OSU_CLIENT_ID: process.env.NEXT_PUBLIC_OSU_CLIENT_ID,
    NEXT_PUBLIC_OSU_REDIRECT_URI: process.env.NEXT_PUBLIC_OSU_REDIRECT_URI,
    NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    NEXT_PUBLIC_DISCORD_REDIRECT_URI:
      process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  }
})
