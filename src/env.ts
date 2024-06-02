import { vercel } from '@t3-oss/env-core/presets'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	extends: [vercel()],
	server: {
		CONVEX_AUTH_PRIVATE_KEY: z.string().min(1)
	},
	client: {
		NEXT_PUBLIC_CONVEX_URL: z.string().min(1)
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL
	}
})
