import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'convex',
    environment: 'edge-runtime'
  }
})
