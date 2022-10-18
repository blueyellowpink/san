import { redis } from '../cache'
import { CainanceSequel } from 'cainance'
import { commandOptions } from 'redis'

import { orderbookCache } from './orderbook'
import { tickCache } from './tick'
import { candlestickCache } from './candlestick'

const createNamespace = (io, pair: string) => {
    const nsp = io.of('/' + pair)

    nsp.on('connection', socket => {
        console.log(`${socket.nsp.name} connected`)

        orderbookCache(socket, pair)
        tickCache(socket, pair)

        socket.on('candlesticks', async (message, ack) => {
            const candlesticks = await candlestickCache(
                socket,
                pair,
                message.timeWindow
            )
            ack(candlesticks)
        })

        socket.on('disconnect', () => {
            console.log('disconnected')
        })
    })

    /* nsp.use((socket, next) => {
        next()
    }) */
}

export const createNamespaces = async io => {
    const pairs = await CainanceSequel.Pair.findAll()
    // console.log(pairs)

    pairs.map(pair => createNamespace(io, pair.slug))
}
