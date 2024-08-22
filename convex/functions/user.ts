import { id, string } from 'convex-helpers/validators'
import { ConvexError } from 'convex/values'

import { internalMutation } from '../_generated/server'
import { getUser } from '../utils'

export const create = internalMutation({
  args: { clerkId: string, osuId: string, osuName: string },
  returns: id('users'),
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', {
      clerkId: args.clerkId,
      osuId: args.osuId,
      osuName: args.osuName,
      updatedAt: Date.now()
    })
    return userId
  }
})

export const remove = internalMutation({
  args: { clerkId: string },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, args.clerkId)
    if (!user) {
      throw new ConvexError({ message: 'No user found for this identifier.' })
    }
    await ctx.db.delete(user._id)
  }
})
