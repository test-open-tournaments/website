'use node'

import { v } from 'convex/values'
import { Webhook } from 'svix'

import { internalAction } from '../_generated/server'

import type { WebhookEvent } from '@clerk/clerk-sdk-node'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET ?? ''

export const fulfill = internalAction({
  args: { headers: v.any(), payload: v.string() },
  handler: async (_, args) => {
    const wh = new Webhook(webhookSecret)
    return wh.verify(args.payload, args.headers) as WebhookEvent
  }
})
