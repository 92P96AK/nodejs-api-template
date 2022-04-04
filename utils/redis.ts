import * as Redis from 'redis'
import { config } from '../infrastructure/env'
const url = `redis://default:${config.redis.password}@${config.redis.host}:${config.redis.port}`
export const redisClient = Redis.createClient({
   url,
})
