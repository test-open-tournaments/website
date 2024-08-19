import { string } from 'convex-helpers/validators'
import { ConvexError } from 'convex/values'

import { query } from '../_generated/server'

export const getByOsuId = query({
  args: { tag: string },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_osuId', q => q.eq('osu_id', args.tag))
      .first()
    if (!user) {
      throw new ConvexError({ message: 'No user found for this identifier' })
    }
    return user
  }
})
