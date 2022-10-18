import { createOrderbookConsumer } from './orderbookConsumer'
import { CainanceSequel } from 'cainance'

const createConsumer = (io, pair) => {
    const namespace = io.of('/' + pair)

    createOrderbookConsumer(namespace, pair)
}

export const createConsumers = async io => {
    const pairs = await CainanceSequel.Pair.findAll()

    pairs.map(pair => createConsumer(io, pair.slug))
}
