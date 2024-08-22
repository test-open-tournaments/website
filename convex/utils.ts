import {
  customMutation,
  customQuery
} from 'convex-helpers/server/customFunctions'
import {
  wrapDatabaseReader,
  wrapDatabaseWriter
} from 'convex-helpers/server/rowLevelSecurity'
import { ConvexError } from 'convex/values'

import { mutation, query } from './_generated/server'

import type { MutationCtx, QueryCtx } from './_generated/server'

export async function getUser(ctx: QueryCtx | MutationCtx, clerkId: string) {
  const user = await ctx.db
    .query('users')
    .withIndex('by_clerkId', q => q.eq('clerkId', clerkId))
    .first()
  return user
}

export const authRLSQuery = customQuery(query, {
  args: {},
  input: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Sorry, you must be logged in to perform this action'
      })
    }

    const db = wrapDatabaseReader({ identity }, ctx.db, {
      users: {
        read: async (ctx, user) => ctx.identity.subject === user.clerkId
      }
    })
    return { ctx: { ...ctx, db, identity }, args }
  }
})

export const authRLSMutation = customMutation(mutation, {
  args: {},
  input: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Sorry, you must be logged in to perform this action'
      })
    }

    const db = wrapDatabaseWriter({ identity }, ctx.db, {
      users: {
        insert: async ctx => !!ctx.identity.subject,
        modify: async (ctx, user) => ctx.identity.subject === user.clerkId
      }
    })
    return { ctx: { ...ctx, db, identity }, args }
  }
})
