import { createClient } from 'redis'
import { CainanceConfig, CainanceSequel, proto } from 'cainance'

export const redis = createClient({
    url:
        process.env.NODE_ENV === 'prod'
            ? `redis://default:${CainanceConfig.REDIS_PASSWORD}@${CainanceConfig.REDIS_MASTER}:6379`
            : 'redis://default:redispassword@127.0.0.1:6379',
})

redis.on('error', err => {
    console.log(err.message)
})
