import { redis } from '../cache'
import { proto } from 'cainance'
import { commandOptions } from 'redis'

export const tickCache = (socket, pair: string) => {
    redis
        .hGet(commandOptions({ returnBuffers: true }), 'ticks', pair)
        .then(data => {
            const ticks = proto.Ticks.deserializeBinary(data).toObject()
            socket.emit('ticks', ticks)
        })
}
