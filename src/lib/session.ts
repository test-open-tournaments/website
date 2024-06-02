import { env } from '@env'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import type { Session } from '@types'

const key = new TextEncoder().encode(env.JWT_SECRET)

// biome-ignore lint/suspicious/noExplicitAny: allow any type of payload
export async function encrypt(payload: any, expiry?: string | number | Date) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(expiry ?? '1 week from now')
		.sign(key)
}

export async function decrypt<T>(input: string): Promise<T> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ['HS256']
	})
	return payload as T
}

export async function getSession() {
	const session = cookies().get('session')?.value
	if (!session) return null
	return await decrypt<Session>(session)
}

export async function deleteSession() {
	cookies().set('session', '', { expires: new Date(0) })
}
