import { redis } from '../cache'
import { proto } from 'cainance'
import { commandOptions } from 'redis'

export const orderbookCache = (socket, pair) => {
    redis
        .hGet(commandOptions({ returnBuffers: true }), 'orderbook', pair)
        .then(data => {
            const cache = proto.OrderBook.deserializeBinary(data).toObject()
            socket.emit('orderbook', cache)
        })
}
