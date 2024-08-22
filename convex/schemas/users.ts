import { Table } from 'convex-helpers/server'
import { number, string } from 'convex-helpers/validators'

export const Users = Table('users', {
  clerkId: string,
  osuId: string,
  osuName: string,
  updatedAt: number
})
