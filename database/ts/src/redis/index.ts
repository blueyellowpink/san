import { createClient } from 'redis'

const redis = createClient({
    url:
        process.env.NODE_ENV === 'prod'
            ? `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_MASTER}:6379`
            : 'redis://localhost:6379',
})

redis.on('error', err => {
    console.log(err.message)
})

export default redis
