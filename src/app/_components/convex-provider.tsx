'use client'

import {
	ConvexProvider as ConvexClientProvider,
	ConvexReactClient
} from 'convex/react'
import type { ReactNode } from 'react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? '')

interface ConvexProviderProps {
	children: ReactNode
}

export default function ConvexProvider({ children }: ConvexProviderProps) {
	return <ConvexClientProvider client={convex}>{children}</ConvexClientProvider>
}
