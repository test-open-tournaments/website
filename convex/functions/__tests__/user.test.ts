import { convexTest } from 'convex-test'
import { expect, test } from 'vitest'
import { api } from '../../_generated/api'
import schema from '../../schema'

import type { WithoutSystemFields } from 'convex/server'
import type { Doc } from '../../_generated/dataModel'

test('getting a user by osu id', async () => {
	const t = convexTest(schema)
	const mockUser = {
		osu_id: '10396090',
		osu_name: 'entro',
		updatedAt: Date.now()
	} satisfies WithoutSystemFields<Doc<'users'>>

	await t.run(async ctx => {
		return await ctx.db.insert('users', mockUser)
	})

	const user = await t.query(api.functions.user.getByOsuId, {
		tag: mockUser.osu_id
	})
	expect(user).toMatchObject(mockUser)
})
