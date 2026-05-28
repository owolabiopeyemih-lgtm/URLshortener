import { Redis } from 'ioredis'

let redisAvailable = false

export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: 1,
  lazyConnect: true,
  enableReadyCheck: false,
  connectTimeout: 2000,
})

redis.on('ready', () => {
  redisAvailable = true
  console.log('[Redis] Connected')
})

redis.on('error', () => {
  redisAvailable = false
})

redis.connect().catch(() => {
  console.log('[Redis] Not available — running without cache')
})

export const cache = {
  async get(key: string): Promise<string | null> {
    if (!redisAvailable) return null
    try {
      return await redis.get(key)
    } catch {
      return null
    }
  },
  async setex(key: string, ttl: number, value: string): Promise<void> {
    if (!redisAvailable) return
    try {
      await redis.setex(key, ttl, value)
    } catch {
      // no-op
    }
  },
  async del(key: string): Promise<void> {
    if (!redisAvailable) return
    try {
      await redis.del(key)
    } catch {
      // no-op
    }
  },
}
