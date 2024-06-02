import { Table } from 'convex-helpers/server'
import { number, string } from 'convex-helpers/validators'

export const Users = Table('users', {
	osu_id: string,
	osu_name: string,
	updatedAt: number
})
