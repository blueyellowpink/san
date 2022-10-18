import { CainanceSequel } from 'cainance'

import { redis } from '../cache'
import { createTickSubscriber } from './tickSubscriber'
import { createCandlestickSubscriber } from './candlestickSubscriber'
import { createOrderbookSubscriber } from './orderbookSubscriber'

export const subscriber = redis.duplicate()

const createSubscriber = (io, pair: string) => {
    const namespace = io.of('/' + pair)

    createTickSubscriber(subscriber, namespace, pair)
    createCandlestickSubscriber(subscriber, namespace, pair)
    createOrderbookSubscriber(subscriber, namespace, pair)
}

export const createSubscribers = async io => {
    const pairs = await CainanceSequel.Pair.findAll()

    pairs.map(pair => createSubscriber(io, pair.slug))
}
