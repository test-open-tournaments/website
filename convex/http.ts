import { httpRouter } from 'convex/server'

import { webhookSync } from './httpActions/clerk'

const http = httpRouter()

http.route({
  path: '/clerk',
  method: 'POST',
  handler: webhookSync
})

export default http
