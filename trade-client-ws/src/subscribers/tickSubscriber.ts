import { proto } from 'cainance'

export const createTickSubscriber = (subscriber, nsp, pair: string) => {
    subscriber.subscribe(
        `${pair}-ticks`,
        data => {
            const ticks = proto.Ticks.deserializeBinary(data).toObject()
            nsp.emit('ticks', ticks)
        },
        true
    )
}
