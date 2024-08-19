export default {
  providers: [
    {
      domain: process.env.CLERK_PUBLIC_API_URL,
      applicationID: 'convex'
    }
  ]
}
