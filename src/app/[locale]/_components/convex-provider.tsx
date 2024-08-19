'use client'

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { env } from '@env'

import type { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)

export default function ConvexProvider({ children }: ProvidersProps) {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
