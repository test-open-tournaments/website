import { convexTest } from 'convex-test'
import { expect, test } from 'vitest'

import { internal } from '../../_generated/api'
import schema from '../../schema'

import type { FunctionArgs } from 'convex/server'

test('creating a user', async () => {
  const t = convexTest(schema)
  const mockUserId = 'user_2fyL'
  const mockUser = {
    clerkId: mockUserId,
    osuId: '230948324',
    osuName: 'cool_username'
  } satisfies FunctionArgs<typeof internal.functions.user.create>

  await t.mutation(internal.functions.user.create, mockUser)

  const user = await t.run(async ctx => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkId', mockUserId))
      .first()
  })

  expect(user).toMatchObject(mockUser)
})

test('deleting a user', async () => {
  const t = convexTest(schema)
  const mockUserId = 'user_2fyL'

  await t.run(async ctx => {
    await ctx.db.insert('users', {
      clerkId: mockUserId,
      osuId: '230948324',
      osuName: 'cool_username',
      updatedAt: Date.now()
    })
  })

  await t.mutation(internal.functions.user.remove, {
    clerkId: mockUserId
  })

  const user = await t.run(async ctx => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkId', mockUserId))
      .first()
  })

  expect(user).toBeNull()
})
