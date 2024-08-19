import { internal } from '../_generated/api'
import { httpAction } from '../_generated/server'

export const webhookSync = httpAction(async (ctx, request) => {
  const headerPayload = request.headers
  const requestIp = headerPayload.get('x-forwarded-for') ?? ''
  const validIps = String(process.env.SVIX_REQUEST_IPS).split(',')

  if (!validIps.includes(requestIp)) {
    return new Response('Forbidden', {
      status: 403
    })
  }

  const payloadString = await request.text()
  try {
    const result = await ctx.runAction(internal.actions.clerk.fulfill, {
      payload: payloadString,
      headers: {
        'svix-id': headerPayload.get('svix-id'),
        'svix-timestamp': headerPayload.get('svix-timestamp'),
        'svix-signature': headerPayload.get('svix-signature')
      }
    })

    switch (result.type) {
      case 'user.created': {
        console.log('user created')
        break
      }
      case 'user.deleted': {
        console.log('user created')
        break
      }
    }

    return new Response(null, {
      status: 200
    })
  } catch (err) {
    return new Response('Webhook Error', {
      status: 400
    })
  }
})
