import { proto } from 'cainance'

export const createOrderbookSubscriber = (subscriber, nsp, pair: string) => {
    subscriber.subscribe(
        `${pair}-orderbook`,
        data => {
            const orderbook = proto.OrderBook.deserializeBinary(data).toObject()
            nsp.emit('orderbook', orderbook)
        },
        true
    )
}
