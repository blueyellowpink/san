import { redis } from '../cache'
import { proto } from 'cainance'
import { commandOptions } from 'redis'

export const candlestickCache = async (
    socket,
    pair: string,
    timeWindow: string
) => {
    const key = `${timeWindow}-candlesticks`
    const data = await redis.hGet(
        commandOptions({ returnBuffers: true }),
        key,
        pair
    )
    const candlesticks = proto.Candlesticks.deserializeBinary(data).toObject()
    // socket.emit(key, candlesticks)
    return candlesticks
}
