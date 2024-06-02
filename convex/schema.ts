import { defineSchema } from 'convex/server'
import { Users } from './schemas/users'

export default defineSchema({
	users: Users.table.index('by_osuId', ['osu_id'])
})
