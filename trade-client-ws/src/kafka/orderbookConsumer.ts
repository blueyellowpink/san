import Kafka from 'node-rdkafka'
import { proto, KafkaConfig } from 'cainance'
import { redis } from '../cache'

const kafkaConfig = KafkaConfig.createConsumerConfigMap(
    KafkaConfig.configFromPath('librdkafka.config')
)

export const createOrderbookConsumer = (nsp, pair) => {
    const topic = `${pair}-orderbook-data`

    const consumer = new Kafka.KafkaConsumer(
        {
            ...kafkaConfig,
            'group.id': `${topic}-orderbook-consumer`,
        },
        {
            'auto.offset.reset': 'earliest',
        }
    )

    consumer
        .on('ready', () => {
            console.log('kafka consumer ready')
            consumer.subscribe([topic])
            consumer.consume() // start consuming messages
        })
        .on('data', ({ topic, key, value }) => {
            redis.hSet('orderbook', pair, Buffer.from(value))
            const orderbook =
                proto.OrderBook.deserializeBinary(value).toObject()
            nsp.emit('orderbook', orderbook)
        })
        .on('event.log', log => {
            console.log(log)
        })
        .on('disconnected', arg => {
            console.log('consumer disconnected. ' + JSON.stringify(arg))
        })

    consumer.connect()
}
